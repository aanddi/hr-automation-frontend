import dayjs from 'dayjs';

const formatDate = (date?: string, format?: string) => {
  if (!date) {
    console.log('Не возможно отформатировать дату');
    return '';
  }
  return dayjs(date).format(format ? format : 'DD.MM.YYYY HH:mm');
};

export default formatDate;
