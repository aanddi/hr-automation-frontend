export const salary = [
  { value: 'RUR', label: '₽' },
  { value: 'EUR', label: '$' },
  { value: 'USD', label: '€' },
];

export const searchRelocation = [
  {
    value: 'living_or_relocation',
    label: 'Живут в указанном регионе или готовы переехать в него',
  },
  {
    value: 'living',
    label: 'Живут в указанном регионе',
  },
  {
    value: 'living_but_relocation',
    label: 'Живут в указанном регионе и готовы к переезду куда-либо',
  },
  {
    value: 'relocation',
    label: 'Не живут в указанном регионе, но готовы переехать в него',
  },
];

export const genders = [
  {
    value: 'unknown',
    label: 'Не имеет значения',
  },
  {
    value: 'male',
    label: 'Мужчина',
  },
  {
    value: 'female',
    label: 'Женщина',
  },
];

export const experience = [
  {
    id: 'noExperience',
    name: 'Нет опыта',
  },
  {
    id: 'between1And3',
    name: 'От 1 года до 3 лет',
  },
  {
    id: 'between3And6',
    name: 'От 3 до 6 лет',
  },
  {
    id: 'moreThan6',
    name: 'Более 6 лет',
  },
];

export const schedule = [
  {
    id: 'fullDay',
    name: 'Полный день',
    uid: 'full_day',
  },
  {
    id: 'shift',
    name: 'Сменный график',
    uid: 'shift',
  },
  {
    id: 'flexible',
    name: 'Гибкий график',
    uid: 'flexible',
  },
  {
    id: 'remote',
    name: 'Удаленная работа',
    uid: 'remote',
  },
  {
    id: 'flyInFlyOut',
    name: 'Вахтовый метод',
    uid: 'fly_in_fly_out',
  },
];

export const educationLevel = [
  {
    id: 'secondary',
    name: 'Среднее',
  },
  {
    id: 'special_secondary',
    name: 'Среднее специальное',
  },
  {
    id: 'unfinished_higher',
    name: 'Неоконченное высшее',
  },
  {
    id: 'higher',
    name: 'Высшее',
  },
  {
    id: 'bachelor',
    name: 'Бакалавр',
  },
  {
    id: 'master',
    name: 'Магистр',
  },
  {
    id: 'candidate',
    name: 'Кандидат наук',
  },
  {
    id: 'doctor',
    name: 'Доктор наук',
  },
];

export const employment = [
  {
    id: 'full',
    name: 'Полная занятость',
  },
  {
    id: 'part',
    name: 'Частичная занятость',
  },
  {
    id: 'project',
    name: 'Проектная работа',
  },
  {
    id: 'volunteer',
    name: 'Волонтерство',
  },
  {
    id: 'probation',
    name: 'Стажировка',
  },
];

export const resumeSearchLogic = [
  {
    value: 'all',
    label: 'Все слова встречаются',
  },
  {
    value: 'any',
    label: 'Любое из слов встречается',
  },
  {
    value: 'phrase',
    label: 'Точная фраза встречается',
  },
  {
    value: 'except',
    label: 'Не встречаются',
  },
];

export const showOnPage = [
  {
    label: '5 резюме',
    value: "5",
  },
  {
    label: '15 резюме',
    value: "15",
  },
  {
    label: '50 резюме',
    value: "50",
  },
  {
    label: '100 резюме',
    value: "100",
  },
];

export const searchOrder = [
  {
    id: 'publication_time',
    name: 'по дате изменения',
  },
  {
    id: 'salary_desc',
    name: 'по убыванию зарплат',
  },
  {
    id: 'salary_asc',
    name: 'по возрастанию зарплаты',
  },
  {
    id: 'relevance',
    name: 'по соответствию',
  },
];

export const statusesEmployer = [
  {
    id: 'active_search',
    name: 'Активно ищет работу',
  },
  {
    id: 'looking_for_offers',
    name: 'Рассматривает предложения',
  },
  {
    id: 'not_looking_for_job',
    name: 'Не ищет работу',
  },
  {
    id: 'has_job_offer',
    name: 'Предложили работу, решает',
  },
  {
    id: 'accepted_job_offer',
    name: 'Вышел на новое место',
  },
];

export const expPeriod = [
  {
    value: 'all_time',
    label: 'за все время',
  },
  {
    value: 'last_year',
    label: 'за последний год',
  },
  {
    value: 'last_three_years',
    label: 'за последние 3 года',
  },
  {
    value: 'last_six_years',
    label: 'за последние 6 лет',
  },
];

export const driverLicenseTypes = [
  {
    value: 'A',
  },
  {
    value: 'B',
  },
  {
    value: 'C',
  },
  {
    value: 'D',
  },
  {
    value: 'E',
  },
  {
    value: 'BE',
  },
  {
    value: 'CE',
  },
  {
    value: 'DE',
  },
  {
    value: 'TM',
  },
  {
    value: 'TB',
  },
];
