const formatPrice = (price?: number) => {
  if (!price) return '';
  return new Intl.NumberFormat('ru-RU').format(price);
};

const parserNumber = (value?: string) => {
  if (!value) return 0;

  return parseInt(value.replace(/\s?|(,*)/g, ''), 10);
};

export { formatPrice, parserNumber };
