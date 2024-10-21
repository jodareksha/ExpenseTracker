import SQLite from 'react-native-sqlite-storage';

const database_name = 'incomes.db';

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

export const createTablesIncome = async () => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS incomes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Incomes REAL,
          category TEXT,
          name TEXT,
          time TEXT
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
export const addIncome = async (
  incomes: number,
  name: string,
  category: string,
  time: string,
) => {
  const db = await getDBConnection();
  return db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO incomes (incomes,name,category,time) VALUES (?,?, ?, ?);`,
      [incomes, name, category, time],
      (tx, results) => {
        console.log('incomes added successfully');
      },
      (tx, error) => {
        console.log('Error adding expense:', error);
      },
    );
  });
};

export const getTotalIncome = async (): Promise<number> => {
  const db = await getDBConnection(); // Get the database connection
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(incomes) as total FROM incomes;`, // Summing all expenses
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

export const getIncomes = async (): Promise<any> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM incomes;`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let expenses = [];

          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          console.log(`Number of rows returned: ${rows.length}`);
          resolve(expenses);
        },
        (tx, error) => {
          console.log('Error getting incomes:', error);
          reject(error);
        },
      );
    });
  });
};

export const deleteIncomes = async (id: number) => {
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
