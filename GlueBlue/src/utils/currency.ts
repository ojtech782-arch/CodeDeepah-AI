export const convertCurrency = (amount: number, rate: number): number => {
    return amount * rate;
};

export const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

export const getCurrencySymbol = (currency: string): string => {
    const symbols: { [key: string]: string } = {
        USD: '$',
        NGN: '₦',
    };
    return symbols[currency] || currency;
};

export const convertToUSD = (amount: number, rate: number): number => {
    return convertCurrency(amount, rate);
};

export const convertToNGN = (amount: number, rate: number): number => {
    return convertCurrency(amount, 1 / rate);
};