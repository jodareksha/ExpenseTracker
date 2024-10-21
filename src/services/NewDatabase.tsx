import SQLite from 'react-native-sqlite-storage';

const database_name = 'expenses.db';
SQLite.enablePromise(true);

let db = SQLite.openDatabase({
  name: database_name,
  location: 'default',
});

// Get a database connection
export const getDBConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabase({
      name: database_name,
      location: 'default',
      createFromLocation: '1',
    });
  }
  return db;
};

// Create the Users table with id, name, role, and password
export const createUsersTable = async () => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          role TEXT,
          password TEXT
        );`,
      [],
      () => {
        console.log('Users table with password created successfully');
      },
      (tx, error) => {
        console.log('Error creating users table:', error);
      },
    );
  });
};

export const createExpensesTable = async () => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL,
          category TEXT,
          desc TEXT,
          time TEXT,
          userId INTEGER,  -- Link each expense to a user
          FOREIGN KEY (userId) REFERENCES users (id)
        );`,
      [],
      () => {
        console.log('Expenses table created/modified successfully');
      },
      (tx, error) => {
        console.log('Error creating expenses table:', error);
      },
    );
  });
};

export const createTablesIncome = async () => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Incomes REAL,
            category TEXT,
            name TEXT,
            time TEXT,
            userId INTEGER,  -- Link each expense to a user
            FOREIGN KEY (userId) REFERENCES users (id)
          );`,
      [],
      () => {
        console.log('Table income created successfully');
      },
      (tx, error) => {
        console.log('Error creating table:', error);
      },
    );
  });
};

// Get all expenses (for admin)
export const getAllExpenses = async (): Promise<any[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT expenses.*, users.name as userName FROM expenses 
           JOIN users ON expenses.userId = users.id;`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          resolve(expenses);
        },
        (tx, error) => {
          console.log('Error fetching expenses:', error);
          reject(error);
        },
      );
    });
  });
};

// Delete an expense (only if the user is an admin or the owner of the expense)
export const deleteExpense = async (
  id: number,
  userId: number,
  isAdmin: boolean,
) => {
  const db = await getDBConnection();

  // Admin can delete any expense, users can delete only their own
  const query = isAdmin
    ? `DELETE FROM expenses WHERE id = ?;`
    : `DELETE FROM expenses WHERE id = ? AND userId = ?;`;
  const params = isAdmin ? [id] : [id, userId];

  return db.transaction(tx => {
    tx.executeSql(
      query,
      params,
      (tx, results) => {
        console.log(`Expense with id ${id} deleted successfully`);
      },
      (tx, error) => {
        console.log('Error deleting expense:', error);
      },
    );
  });
};

// Get expenses for a specific user (for regular users)
export const getExpensesForUser = async (userId: number): Promise<any[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE userId = ?;`,
        [userId],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          resolve(expenses);
        },
        (tx, error) => {
          console.log('Error fetching user-specific expenses:', error);
          reject(error);
        },
      );
    });
  });
};

// Insert an expense linked to a user
export const addExpense = async (
  amount: number,
  category: string,
  desc: string,
  time: string,
  userId: number,
) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO expenses (amount, category, desc, time, userId) VALUES (?, ?, ?, ?, ?);`,
      [amount, category, desc, time, userId],
      (tx, results) => {
        console.log('Expense added successfully');
      },
      (tx, error) => {
        console.log('Error adding expense:', error);
      },
    );
  });
};

export const addIncome = async (
  incomes: number,
  name: string,
  category: string,
  time: string,
  userId: number,
) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO incomes (incomes,name,category,time,userId) VALUES (?, ?, ?, ?, ?);`,
      [incomes, name, category, time, userId],
      (tx, results) => {
        console.log('incomes added successfully');
      },
      (tx, error) => {
        console.log('Error adding expense:', error);
      },
    );
  });
};

export const getTotalIncome = async (userId: number): Promise<number> => {
  const db = await getDBConnection(); // Get the database connection
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM incomes WHERE userId = ?;`, // Summing all expenses
        [userId],
        (tx, results) => {
          let SUMIT = 0;
          for (let index = 0; index < results.rows.length; index++) {
            const element = results.rows.item(index);
            SUMIT += element.Incomes;
          }
          resolve(SUMIT); // Resolve with total spending value
        },
        (tx, error) => {
          console.log('Error calculating total spending:', error);
          reject(error); // Reject if there’s an error
        },
      );
    });
  });
};

export const getTotalSpending = async (userId: number): Promise<number> => {
  const db = await getDBConnection(); // Get the database connection
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE userId = ?;`, // Summing all expenses
        [userId],
        (tx, results) => {
          let SUMIT = 0;
          for (let index = 0; index < results.rows.length; index++) {
            const element = results.rows.item(index);
            SUMIT += element.amount;
          }
          resolve(SUMIT); // Resolve with total spending value
        },
        (tx, error) => {
          console.log('Error calculating total spending:', error);
          reject(error); // Reject if there’s an error
        },
      );
    });
  });
};

export const getCategoryBreakdownForAdmin = async (
  startDate: Date,
  endDate: Date,
): Promise<any[]> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // First, get the total spending across all users within the date range
      tx.executeSql(
        `SELECT SUM(amount) as total 
            FROM expenses 
            WHERE time BETWEEN ? AND ?;`,
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            // Get the category breakdown for all users
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal 
                   FROM expenses 
                   WHERE time BETWEEN ? AND ?
                   GROUP BY category;`,
              [
                startDate.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0],
              ],
              (tx, results) => {
                let categoryData = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  const percentage = (
                    (item.categoryTotal / totalSpending) *
                    100
                  ).toFixed(2);
                  categoryData.push({
                    category: item.category,
                    amount: item.categoryTotal,
                    percentage: percentage,
                  });
                }
                // Resolve the breakdown by category
                resolve(categoryData);
              },
              (tx, error) => {
                // Handle errors in the category breakdown query
                console.log(
                  'Error calculating category breakdown for admin:',
                  error,
                );
                reject(error);
              },
            );
          } else {
            // If no spending, resolve with an empty array
            resolve([]);
          }
        },
        (tx, error) => {
          // Handle errors in the total spending query
          console.log('Error calculating total spending for admin:', error);
          reject(error);
        },
      );
    });
  });
};

export const getCategoryBreakdown = async (
  startDate: Date,
  endDate: Date,
  userId: number,
): Promise<any[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as total 
          FROM expenses 
          WHERE time BETWEEN ? AND ? 
          AND userId = ?;`,
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
          userId,
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal 
                 FROM expenses 
                 WHERE time BETWEEN ? AND ? 
                 AND userId = ?
                 GROUP BY category;`,
              [
                startDate.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0],
                userId,
              ],
              (tx, results) => {
                let categoryData = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  const percentage = (
                    (item.categoryTotal / totalSpending) *
                    100
                  ).toFixed(2);
                  categoryData.push({
                    category: item.category,
                    amount: item.categoryTotal,
                    percentage: percentage,
                  });
                }
                // Resolve the breakdown by category
                resolve(categoryData);
              },
              (tx, error) => {
                // Handle errors in the category breakdown query
                console.log('Error calculating category breakdown:', error);
                reject(error);
              },
            );
          } else {
            // If no spending, resolve with an empty array
            resolve([]);
          }
        },
        (tx, error) => {
          // Handle errors in the total spending query
          console.log('Error calculating total spending:', error);
          reject(error);
        },
      );
    });
  });
};

export const getExpensesLast7Days = async (userId: number): Promise<any[]> => {
  const db = await getDBConnection();
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE time BETWEEN ? AND ? AND userId = ?;`,
        [
          sevenDaysAgo.toISOString().split('T')[0], // Start date (7 days ago)
          today.toISOString().split('T')[0], // End date (today)
          userId, // User ID
        ],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          // Resolve the expenses for the last 7 days
          resolve(expenses);
        },
        (tx, error) => {
          // Handle errors during fetching
          console.log('Error fetching expenses for last 7 days:', error);
          reject(error);
        },
      );
    });
  });
};

export const getExpensesForCurrentMonth = async (
  userId: number,
): Promise<any[]> => {
  const db = await getDBConnection();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE time BETWEEN ? AND ? AND userId = ?;`,
        [
          firstDayOfMonth.toISOString().split('T')[0], // First day of the month
          lastDayOfMonth.toISOString().split('T')[0], // Last day of the month
          userId, // User ID
        ],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          // Resolve the expenses for the current month
          resolve(expenses);
        },
        (tx, error) => {
          // Handle errors during fetching
          console.log('Error fetching expenses for the current month:', error);
          reject(error);
        },
      );
    });
  });
};

// Add a new user with a hashed password (admin or user)
export const addUser = async (name: string, role: string, password: string) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (name, role, password) VALUES (?, ?, ?);`,
      [name, role, password],
      (tx, results) => {
        console.log('User with password added successfully');
      },
      (tx, error) => {
        console.log('Error adding user:', error);
      },
    );
  });
};

// Check if the provided password matches the hashed password in the database
export const loginUser = async (
  name: string,
  password: string,
): Promise<any> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE name = ?;`,
        [name],
        async (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            const hashedPassword = user.password;

            const passwordMatch = password === hashedPassword;
            console.log(hashedPassword);
            if (passwordMatch) {
              resolve(user);
            } else {
              reject('Invalid password'); // Password does not match
            }
          } else {
            reject('User not found'); // No user with this name
          }
        },
        (tx, error) => {
          console.log('Error logging in:', error);
          reject(error);
        },
      );
    });
  });
};

export const getCategoryBreakdown2 = async (
  startDate: Date,
  endDate: Date,
  userId: number, // Add userId as a parameter
): Promise<any[]> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // First query to get total spending for the specific user in the date range
      tx.executeSql(
        `SELECT SUM(amount) as total 
           FROM expenses 
           WHERE time BETWEEN ? AND ? 
           AND userId = ?;`, // Filter by userId
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
          userId, // Pass userId
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            // Second query to get the category breakdown for the specific user in the date range
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal 
                 FROM expenses 
                 WHERE time BETWEEN ? AND ? 
                 AND userId = ? 
                 GROUP BY category;`, // Filter by userId and group by category
              [
                startDate.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0],
                userId, // Pass userId
              ],
              (tx, results) => {
                const categoryData = [];
                const colorMapping = {
                  Shopping: {color: '#009FFF', gradientCenterColor: '#006DFF'},
                  Subscription: {
                    color: '#93FCF8',
                    gradientCenterColor: '#3BE9DE',
                  },
                  Insurance: {color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
                  Food: {color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
                  Transportation: {
                    color: '#FF5733',
                    gradientCenterColor: '#FF4D00',
                  }, // Add more categories and their colors as needed
                };

                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  const percentage = (
                    (item.categoryTotal / totalSpending) *
                    100
                  ).toFixed(2);

                  const {color, gradientCenterColor} = colorMapping[
                    item.category
                  ] || {color: '#CCCCCC', gradientCenterColor: '#999999'}; // Default colors if category not found

                  categoryData.push({
                    value: Number(percentage),
                    color,
                    gradientCenterColor,
                    title: item.category,
                  });
                }

                resolve(categoryData);
              },
              (tx, error) => {
                console.log(
                  'Error calculating category breakdown for user:',
                  error,
                );
                reject(error);
              },
            );
          } else {
            resolve([]); // No spending, return an empty array
          }
        },
        (tx, error) => {
          console.log('Error calculating total spending for user:', error);
          reject(error);
        },
      );
    });
  });
};

export const getCategoryBreakdownForAdmin2 = async (
  startDate: Date,
  endDate: Date,
): Promise<any[]> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // First query to get total spending across all users within the date range
      tx.executeSql(
        `SELECT SUM(amount) as total 
           FROM expenses 
           WHERE time BETWEEN ? AND ?;`,
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            // Second query to get the category breakdown across all users within the date range
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal 
                 FROM expenses 
                 WHERE time BETWEEN ? AND ? 
                 GROUP BY category;`,
              [
                startDate.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0],
              ],
              (tx, results) => {
                const categoryData = [];
                const colorMapping = {
                  Shopping: {color: '#009FFF', gradientCenterColor: '#006DFF'},
                  Subscription: {
                    color: '#93FCF8',
                    gradientCenterColor: '#3BE9DE',
                  },
                  Insurance: {color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
                  Food: {color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
                  Transportation: {
                    color: '#FF5733',
                    gradientCenterColor: '#FF4D00',
                  }, // Add more categories and their colors as needed
                };

                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  const percentage = (
                    (item.categoryTotal / totalSpending) *
                    100
                  ).toFixed(2);

                  const {color, gradientCenterColor} = colorMapping[
                    item.category
                  ] || {color: '#CCCCCC', gradientCenterColor: '#999999'}; // Default colors if category not found

                  categoryData.push({
                    value: Number(percentage),
                    color,
                    gradientCenterColor,
                    title: item.category,
                  });
                }

                resolve(categoryData);
              },
              (tx, error) => {
                console.log(
                  'Error calculating category breakdown for admin:',
                  error,
                );
                reject(error);
              },
            );
          } else {
            resolve([]); // No spending, return an empty array
          }
        },
        (tx, error) => {
          console.log('Error calculating total spending for admin:', error);
          reject(error);
        },
      );
    });
  });
};
