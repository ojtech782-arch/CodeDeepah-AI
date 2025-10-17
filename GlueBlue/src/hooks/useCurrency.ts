import { useState, useEffect } from 'react';
import { fetchCurrencyRates } from '../utils/currency';

const useCurrency = () => {
    const [currencyRates, setCurrencyRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCurrencyRates = async () => {
            try {
                const rates = await fetchCurrencyRates();
                setCurrencyRates(rates);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getCurrencyRates();
    }, []);

    const convertCurrency = (amount, fromCurrency, toCurrency) => {
        if (!currencyRates[fromCurrency] || !currencyRates[toCurrency]) {
            return null;
        }
        const convertedAmount = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
        return convertedAmount.toFixed(2);
    };

    return { currencyRates, loading, error, convertCurrency };
};

export default useCurrency;