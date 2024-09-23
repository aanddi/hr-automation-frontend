const formatExperience = (months?: number) => {
  if (!months) return 'Не указан';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let experienceString = '';

  if (years > 0) {
    experienceString += `${years} `;
    if (years % 10 === 1 && years % 100 !== 11) {
      experienceString += 'год';
    } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
      experienceString += 'года';
    } else {
      experienceString += 'лет';
    }

    if (remainingMonths > 0) {
      experienceString += ` ${remainingMonths} `;
      experienceString += remainingMonths === 1 ? 'месяц' : 'месяца';
    }

    return experienceString;
  } else {
    experienceString += `${remainingMonths} `;
    experienceString += remainingMonths === 1 ? 'месяц' : 'месяца';
    return experienceString;
  }
};

export default formatExperience;
