interface IFilterParams {
  salary_from: string;
  salary_to: string;
  age_from: string;
  age_to: string;
  text: string;
  logic: string;
  order_by: string;
  gender: string;
  currency_code: string;
  label_only_with_age: boolean;
  label_only_with_photo: boolean;
  label_only_with_salary: boolean;
  label_only_with_vehicle: boolean;
  education_level: string;
  employment: string[];
  experience: string[];
  schedule: string[];
  job_search_status: string[];
  per_page: string;
  area: string[];
  relocation: string;
  filter_exp_industry: string[];
  filter_exp_period: string;
  driver_license_types: string[];
  professional_role: string[];
  skill: string[];
  citizenship: string[];
  work_ticket: string[];
}

interface IFilters {
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
}

export type { IFilterParams, IFilters };
