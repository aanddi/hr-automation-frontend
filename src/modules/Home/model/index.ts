import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { hhService } from '@common/api/services/hh';
import { scoreballService } from '@common/api/services/scoreball';
import { ICreateScoreball } from '@common/api/services/scoreball/type';
import { searchService } from '@common/api/services/search';

import { recurseFunc } from './helper';

const useResumes = (params: string) => {
  return useQuery({
    queryKey: ['GET-RESUMES', params],
    queryFn: async () => {
      return searchService.getResumes(params.toString());
    },
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useAreas = () => {
  return useQuery({
    queryKey: ['GET-AREAS'],
    queryFn: async () => hhService.getAreas(),
    select: (data) => recurseFunc(data, 'areas'),
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useExperience = () => {
  return useQuery({
    queryKey: ['GET-EXPERIENCE'],
    queryFn: async () => hhService.getExperience(),
    select: (data) => recurseFunc(data, 'industries'),
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useCountries = () => {
  return useQuery({
    queryKey: ['GET-COUNTRIES'],
    queryFn: async () => hhService.getCountries(),
    select: (data) =>
      data.map((countrie: any) => {
        return {
          value: countrie.id,
          label: countrie.name,
        };
      }),
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useProfessionalRoles = () => {
  return useQuery({
    queryKey: ['GET-PROFESSIONAL-ROLES'],
    queryFn: async () => hhService.getProfessionalRoles(),
    select: ({ categories }) => {
      if (!categories || categories.length === 0) return [];

      const resultArray: any = [];
      const uniqId = new Set();

      categories.map((role: any, index: number) => {
        const parentObj = {
          key: `key-${index + 1}`,
          value: `key-${index + 1}`,
          title: role.name,
          children: [],
        };

        if (Array.isArray(role.roles)) {
          const listRoles: any = [];

          role.roles.map((elem: any) => {
            if (!uniqId.has(elem.id)) {
              uniqId.add(elem.id);
              const newRole = {
                value: elem.id,
                title: elem.name,
              };
              listRoles.push(newRole);
            }
          });
          parentObj.children = listRoles;
        }

        resultArray.push(parentObj);
      });

      return resultArray;
    },
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useAnalyzeResumes = () => {
  return useMutation({
    mutationFn: async (data: ICreateScoreball) => {
      const body = {
        resumes: data.items,
        title: data.title,
        isDeepScoring: data.isDeepScoring,
      };
      const response = await toast.promise(scoreballService.createScoreball(body), {
        loading: 'Анализ списка резюме...',
        success: 'Анализ успешно проведен и сохранен',
        error: 'Ошибка. Анализ провалился',
      });

      return response.data;
    },
    onError(err: any) {
      console.error('Ошибка при выполнении метода => useAnalyzeResumes', err);
      return err.response?.data?.message;
    },
  });
};

export {
  useResumes,
  useAnalyzeResumes,
  useAreas,
  useExperience,
  useProfessionalRoles,
  useCountries,
};
