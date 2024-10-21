import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {getExchangeRates} from '../../../context/Action';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [fromAmount, setFromAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0.8575);
  const [convertedAmount, setConvertedAmount] = useState('0.00');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await getExchangeRates(fromCurrency, toCurrency);
        setExchangeRate(response.conversion_rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (amount: string) => {
    setFromAmount(amount);
    const converted = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(converted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 10}}>
        <Image
          source={require('../../../components/ExchangeRate/icons/SwapFrom.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>Swap From</Text>
        <Text style={styles.exchangeRateText}>SGD $1.00</Text>
        <TextInput
          style={styles.input}
          placeholder="From Amount"
          keyboardType="numeric"
          value={fromAmount}
          onChangeText={handleAmountChange}
        />

        <Text style={styles.toText}>to</Text>
        <Text style={styles.exchangeRateText}>IDR Rp.{exchangeRate}</Text>

        <TextInput
          style={styles.input}
          value={convertedAmount}
          editable={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  toText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  exchangeRateText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};

export default CurrencyConverter;
