const formatCurrency = (currency: string) => {
  if (currency === 'RUR') return '₽';
  if (currency === 'EUR') return '$';
  if (currency === 'USD') return '€';
  if (currency === 'KZT') return '₸';
  if (currency === 'BYR') return 'Br';

  return currency;
};

export default formatCurrency;
