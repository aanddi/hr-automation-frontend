import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const formatDate = (date?: string, format?: string) => {
  if (!date) return '';
  dayjs.locale('ru');
  return dayjs(date).format(format ? format : 'DD.MM.YYYY HH:mm');
};

export default formatDate;
