import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const formatDate = (date?: string, format?: string) => {
  if (!date) {
    console.log('Не возможно отформатировать дату');
    return '';
  }
  dayjs.locale('ru');
  return dayjs(date).format(format ? format : 'MMMM YYYY');
};

export default formatDate;
