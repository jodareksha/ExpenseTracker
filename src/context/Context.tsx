import React, {createContext, ReactNode, FC, useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getExpensesForUser,
  getTotalIncome,
  getTotalSpending,
  getCategoryBreakdown,
  loginUser,
  getExpensesLast7Days,
  getExpensesForCurrentMonth,
  getAllExpenses,
  getCategoryBreakdownForAdmin,
  getCategoryBreakdown2,
  getCategoryBreakdownForAdmin2,
} from '../services/NewDatabase';
import {ToastAndroid} from 'react-native';
import HandlerWarning from '../components/HandleAlert/HandleAlert';

interface User {
  id: number;
  name: string;
  role: string;
  token: string;
}

interface StateParams {
  categoryBreakdown: any[];
  categoryBreakdown2: any[];
  adminData: any[];
  expenses: ExpenseState[];
  spend: number;
  income: number;
  change: number;
  setChange: React.Dispatch<React.SetStateAction<number>>;
  fetchExpenses: () => void;
  fetchAdminScreen: () => void;
  user: User | null;
  loginUsers: (name: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoading: boolean;
}

const UseContext = createContext<StateParams | undefined>(undefined);

type UseProviderProps = {
  children: ReactNode;
};

export interface ExpenseState {
  id: number;
  amount: number;
  category: string;
  desc: string;
  time: string;
}

const UseProvider: FC<UseProviderProps> = ({children}) => {
  const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
  const [categoryBreakdown2, setCategoryBreakdown2] = useState<any[]>([]);

  const [expenses, setExpenses] = useState<ExpenseState[]>([]);
  const [spend, setSpend] = useState<number>(0);
  const [income, setIncome] = useState(0);
  const [change, setChange] = useState<number>(1);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [adminData, setAdminData] = useState<any>();

  useEffect(() => {
    // Check if there's a user token saved in AsyncStorage on mount
    const checkStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkStoredUser();
  }, []);

  const loginUsers = async (name: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await loginUser(name, password);
      setUser(res);
      await AsyncStorage.setItem('user', JSON.stringify(res));
      return res;
    } catch (error) {
      HandlerWarning('Login failed', `${error}`, undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setUser(null); // Clear user state
    await AsyncStorage.removeItem('user');
  };
  const endDate = new Date();
  const startDate7Days = new Date(endDate);
  startDate7Days.setDate(endDate.getDate() - 6);
  const startDate = startDate7Days;

  const fetchAdminScreen = async () => {
    try {
      const data = await getAllExpenses();

      setAdminData(data);
      const breakdown = await getCategoryBreakdownForAdmin(startDate, endDate);
      setCategoryBreakdown(breakdown);
      const breakdown2 = await getCategoryBreakdownForAdmin2(
        startDate,
        endDate,
      );
      setCategoryBreakdown2(breakdown2);
    } catch (e) {
      console.log(e, 'errr fetch err admin');
    }
  };

  const fetchExpenses = async () => {
    try {
      if (change === 1) {
        // const data = await getExpensesForUser(user.id);
        const data = await getExpensesLast7Days(user?.id);
        setExpenses(data);

        const breakdown = await getCategoryBreakdown(
          startDate,
          endDate,
          user.id,
        );
        setCategoryBreakdown(breakdown);
        const breakdown2 = await getCategoryBreakdown2(
          startDate,
          endDate,
          user.id,
        );
        setCategoryBreakdown2(breakdown2);
      } else {
        const data = await getExpensesForCurrentMonth(user.id);
        setExpenses(data);

        const breakdown = await getCategoryBreakdown(
          startDate,
          endDate,
          user.id,
        );
        setCategoryBreakdown(breakdown);

        const breakdown2 = await getCategoryBreakdown2(
          startDate,
          endDate,
          user.id,
        );
        setCategoryBreakdown2(breakdown2);
      }

      const totalSpend = await getTotalSpending(user.id);
      setSpend(totalSpend);
      const totalIncome = await getTotalIncome(user.id);
      setIncome(totalIncome);
    } catch (e) {
      console.log(e, 'eerr fetch expense');
    }
  };

  const stateParams: StateParams = {
    categoryBreakdown2,
    adminData,
    categoryBreakdown,
    change,
    setChange,
    spend,
    expenses,
    income,
    user,
    loginUsers,
    logoutUser,
    isLoading,
    fetchExpenses,
    fetchAdminScreen,
  };

  return (
    <UseContext.Provider value={stateParams}>{children}</UseContext.Provider>
  );
};

export {UseContext, UseProvider};
