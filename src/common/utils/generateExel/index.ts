import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

const generateExcel = <T extends object>(data: T[], fileName: string) => {
  if (!data) throw new Error('Не возможно скачать файл');
  
  const HEIGHT = 45;
  const WIDTH = 20;

  const COLOR_BG_HEADER = 'A0C8FA';
  const COLOR_BORDER_HEADER = '2C5C97';
  const TYPE_BORDER_HEADER = 'thin';

  const COLOR_BG_BODY = 'FAFAFA';
  const COLOR_BORDER_BODY = 'C8CACD';
  const TYPE_BORDER_BODY = 'thin';

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // =========== header ======
  // добавление
  const headers = Object.keys(data[0]);

  // стилизация заголовка
  const headerRow = worksheet.addRow(headers);

  headerRow.height = HEIGHT;

  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: COLOR_BG_HEADER },
  };

  headerRow.font = { bold: true };

  headerRow.alignment = {
    horizontal: 'center',
    vertical: 'middle',
  };

  headerRow.border = {
    top: { style: TYPE_BORDER_HEADER, color: { argb: COLOR_BORDER_HEADER } },
    bottom: { style: TYPE_BORDER_HEADER, color: { argb: COLOR_BORDER_HEADER } },
    left: { style: TYPE_BORDER_HEADER, color: { argb: COLOR_BORDER_HEADER } },
    right: { style: TYPE_BORDER_HEADER, color: { argb: COLOR_BORDER_HEADER } },
  };

  headers.forEach((_, index) => {
    worksheet.getColumn(index + 1).width = WIDTH;
  });

  // =========== body ======
  // заполнение таблицы данными + стилизация body
  data.forEach((item) => {
    const row = worksheet.addRow(Object.values(item));
    row.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: COLOR_BG_BODY },
    };
    row.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
    row.height = HEIGHT;
    row.border = {
      top: { style: TYPE_BORDER_BODY, color: { argb: COLOR_BORDER_BODY } },
      bottom: { style: TYPE_BORDER_BODY, color: { argb: COLOR_BORDER_BODY } },
      left: { style: TYPE_BORDER_BODY, color: { argb: COLOR_BORDER_BODY } },
      right: { style: TYPE_BORDER_BODY, color: { argb: COLOR_BORDER_BODY } },
    };
  });

  // Сохранение файла
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
    toast.success(`Таблица скачена`);
  });
};

export default generateExcel;
