import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HhruService } from '@common/api/services/hh';
import { ScoreballService } from '@common/api/services/scoreball';
import { ICreateScoreball } from '@common/api/services/scoreball/type';

const useResumes = (params: string) => {
  return useQuery({
    queryKey: ['GET-RESUMES', params],
    queryFn: async () => {
      return HhruService.getResumes(params.toString());
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
    queryFn: async () => HhruService.getAreas(),
    select: (data) => {
      if (!data || data.lenght === 0) return [];

      const flattenAreas = (areas: any): any => {
        const areasFormatted = [];

        for (const area of areas) {
          const formattedArea = {
            value: area.id,
            title: area.name,
            children: area.areas ? flattenAreas(area.areas) : [],
          };
          areasFormatted.push(formattedArea);
        }

        return areasFormatted;
      };

      return flattenAreas(data);
    },

    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useExperience = () => {
  return useQuery({
    queryKey: ['GET-EXPERIENCE'],
    queryFn: async () => HhruService.getExperience(),
    select: (data) => {
      if (!data || data.lenght === 0) return [];

      const flattenExperience = (experiences: any): any => {
        const areasFormatted = [];

        for (const experience of experiences) {
          const formattedArea = {
            value: experience.id,
            title: experience.name,
            children: experience.industries ? flattenExperience(experience.industries) : [],
          };
          areasFormatted.push(formattedArea);
        }

        return areasFormatted;
      };

      return flattenExperience(data);
    },

    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useProfessionalRoles = () => {
  return useQuery({
    queryKey: ['GET-PROFESSIONAL-ROLES'],
    queryFn: async () => HhruService.getProfessionalRoles(),
    select: ({ categories }) => {
      if (!categories || categories.length === 0) return [];

      const flattenAreas = (roles: any): any => {
        const areasFormatted = [];
        let count = 1;
        const uniqId: string[] = [];

        for (const role of roles) {
          const obj = {
            key: `key-${count}`,
            value: `key-${count}`,
            title: role.name,
            // disabled: true,
            // checkable: true,
            disableCheckbox: false,
            children: [],
          };

          if (Array.isArray(role.roles)) {
            const arrayedd: any = [];
            for (const elem of role.roles) {
              if (uniqId.includes(elem.id)) {
                continue;
              } else {
                uniqId.push(elem.id);
                const sdfsdf = {
                  value: elem.id,
                  title: elem.name,
                };
                arrayedd.push(sdfsdf);
              }
            }
            obj.children = arrayedd;
          }

          areasFormatted.push(obj);
          count++;
        }

        return areasFormatted;
      };

      return flattenAreas(categories);
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
      const body = { resumes: data.items, title: data.title };
      const response = await toast.promise(ScoreballService.createScoreball(body), {
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

export { useResumes, useAnalyzeResumes, useAreas, useExperience, useProfessionalRoles };
