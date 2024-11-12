export const recurseFunc = (data: any, nameChildren: string) => {
  if (!data || data.lenght === 0) return [];

  const children = nameChildren;

  const resultArray: any = [];

  data.map((elem: any) => {
    const newObj: any = {
      value: elem.id,
      title: elem.name,
      children: elem[children] ? recurseFunc(elem[nameChildren], children) : [],
    };
    resultArray.push(newObj);
  });

  return resultArray;
};
