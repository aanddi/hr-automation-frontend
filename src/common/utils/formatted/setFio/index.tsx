const setFio = (firstName?: string, lastName?: string, middleName?: string) => {
  if (!firstName && !lastName && !middleName) return 'Не указано';
  else {
    const name = firstName || '';
    const surname = lastName || '';
    const patronymic = middleName || '';

    return `${surname} ${name} ${patronymic}`;
  }
};

export default setFio;