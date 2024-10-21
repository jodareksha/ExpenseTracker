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

// Create table if not exists
export const createTables = async () => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        category TEXT,
        desc TEXT,
        time TEXT
      );`,
      [],
      () => {
        console.log('Table created successfully');
      },
      (tx, error) => {
        console.log('Error creating table:', error);
      },
    );
  });
};

// Insert an expense
export const addExpense = async (
  amount: number,
  category: string,
  desc: string,
  time: string,
) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO expenses (amount,category,desc,time) VALUES (?, ?, ?, ?);`,
      [amount, category, desc, time],
      (tx, results) => {
        console.log('Expense added successfully');
      },
      (tx, error) => {
        console.log('Error adding expense:', error);
      },
    );
  });
};

// Get all expenses
export const getExpenses = async (): Promise<any> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses;`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          // console.log(`Number of rows returned: ${rows.length}`);
          resolve(expenses);
        },
        (tx, error) => {
          // console.log('Error getting expenses:', error);
          reject(error);
        },
      );
    });
  });
};

export const getExpensesLast7Days = async (): Promise<any[]> => {
  const db = await getDBConnection();
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE time BETWEEN ? AND ?;`,
        [
          sevenDaysAgo.toISOString().split('T')[0],
          today.toISOString().split('T')[0],
        ],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          // console.log('Expenses for the last 7 days:', expenses);
          resolve(expenses);
        },
        (tx, error) => {
          // console.log('Error fetching expenses for last 7 days:', error);
          reject(error);
        },
      );
    });
  });
};

export const getExpensesForCurrentMonth = async (): Promise<any[]> => {
  const db = await getDBConnection();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE time BETWEEN ? AND ?;`,
        [
          firstDayOfMonth.toISOString().split('T')[0], // First day of the month
          lastDayOfMonth.toISOString().split('T')[0], // Last day of the month
        ],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          // console.log('Expenses for the current month:', expenses);
          resolve(expenses); // Return the fetched expenses
        },
        (tx, error) => {
          // console.log('Error fetching expenses for the current month:', error);
          reject(error);
        },
      );
    });
  });
};

// all spending
export const getTotalSpending = async (): Promise<number> => {
  const db = await getDBConnection(); // Get the database connection
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as total FROM expenses;`, // Summing all expenses
        [],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0; // Default to 0 if no expenses
          // console.log('Total spending:', totalSpending);
          resolve(totalSpending); // Resolve with total spending value
        },
        (tx, error) => {
          console.log('Error calculating total spending:', error);
          reject(error); // Reject if there’s an error
        },
      );
    });
  });
};

//calculate today spend
// export const getCategoryBreakdownToday = async (): Promise<any[]> => {
//   const db = await getDBConnection();
//   const today = new Date().toISOString().split('T')[0];

//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `SELECT SUM(amount) as total FROM expenses WHERE time = ?;`, // Only filter by today's date
//         [today],
//         (tx, results) => {
//           const totalSpending = results.rows.item(0)?.total || 0;

//           if (totalSpending > 0) {
//             // Then, get the spending per category for today
//             tx.executeSql(
//               `SELECT category, SUM(amount) as categoryTotal FROM expenses WHERE time = ? GROUP BY category;`, // Filter by today's date
//               [today],
//               (tx, results) => {
//                 let categoryData = [];
//                 for (let i = 0; i < results.rows.length; i++) {
//                   const item = results.rows.item(i);
//                   const percentage = (
//                     (item.categoryTotal / totalSpending) *
//                     100
//                   ).toFixed(2);
//                   categoryData.push({
//                     category: item.category,
//                     amount: item.categoryTotal,
//                     percentage: percentage, // Percentage of total spending
//                   });
//                 }
//                 console.log(`Today's category breakdown:`, categoryData);
//                 resolve(categoryData); // Return the category data
//               },
//               (tx, error) => {
//                 console.log('Error calculating category breakdown:', error);
//                 reject(error);
//               },
//             );
//           } else {
//             resolve([]); // If no expenses for today, return an empty array
//           }
//         },
//         (tx, error) => {
//           console.log('Error calculating total spending:', error);
//           reject(error);
//         },
//       );
//     });
//   });
// };

//calculate 7 > month
export const getCategoryBreakdown = async (
  startDate: Date,
  endDate: Date,
): Promise<any[]> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as total FROM expenses WHERE time BETWEEN ? AND ?;`,
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal FROM expenses WHERE time BETWEEN ? AND ? GROUP BY category;`, // Changed `date` to `time`
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
                // console.log(
                //   `Category breakdown from ${startDate} to ${endDate}:`,
                //   categoryData,
                // );
                resolve(categoryData);
              },
              (tx, error) => {
                // console.log('Error calculating category breakdown:', error);
                reject(error);
              },
            );
          } else {
            resolve([]);
          }
        },
        (tx, error) => {
          console.log('Error calculating total spending:', error);
          reject(error);
        },
      );
    });
  });
};

// Delete an expense by id
export const deleteExpense = async (id: number) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM expenses WHERE id = ?;`,
      [id],
      (tx, results) => {
        console.log(`Expense with id ${id} deleted successfully`);
      },
      (tx, error) => {
        console.log('Error deleting expense:', error);
      },
    );
  });
};

export const deleteDatabase = () => {
  SQLite.deleteDatabase(
    {
      name: database_name,
      location: 'default',
    },
    () => {
      console.log('Database deleted successfully');
    },
    error => {
      console.error('Error deleting database:', error);
    },
  );
};

export const getCategoryBreakdown2 = async (
  startDate: Date,
  endDate: Date,
): Promise<any[]> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(amount) as total FROM expenses WHERE time BETWEEN ? AND ?;`,
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ],
        (tx, results) => {
          const totalSpending = results.rows.item(0)?.total || 0;

          if (totalSpending > 0) {
            tx.executeSql(
              `SELECT category, SUM(amount) as categoryTotal FROM expenses WHERE time BETWEEN ? AND ? GROUP BY category;`,
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
                  }, // Example additional category
                  // Add more categories and their colors as needed
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
                console.log('Error calculating category breakdown:', error);
                reject(error);
              },
            );
          } else {
            resolve([]);
          }
        },
        (tx, error) => {
          console.log('Error calculating total spending:', error);
          reject(error);
        },
      );
    });
  });
};
