import { utils as XlsxUtils, writeFile as XlsxWriteFile } from "xlsx";

const generateExel = <T>(data: T[], nameFile?: string, nameBook?: string) => {
   const body = XlsxUtils.json_to_sheet(data);
   const bookExcel = XlsxUtils.book_new();
   XlsxUtils.book_append_sheet(
      bookExcel,
      body,
      nameBook ? nameBook : "Новая книга"
   );
   XlsxWriteFile(bookExcel, nameFile ? nameFile : "candidates.xlsx");
};

export default generateExel;
