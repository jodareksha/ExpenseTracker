import axios from 'axios';
import {API_KEY, BASE_URL_Exchange} from './constat/constant';

export const getExchangeRates = async (from: string, to: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL_Exchange}${API_KEY}/pair/${from}/${to}`,
    );
    return await res.data;
  } catch (e) {
    console.log(e);
  }
};
