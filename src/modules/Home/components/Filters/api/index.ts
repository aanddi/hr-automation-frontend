import { useQuery } from '@tanstack/react-query';

import ApiTags from '@common/api/services/ApiTags';
import { hhService } from '@common/api/services/hh';

import { recurseFunc } from './helper';

const useAreas = () => {
  return useQuery({
    queryKey: [ApiTags.GET_AREAS],
    queryFn: async () => hhService.getAreas(),
    select: (data) => recurseFunc(data, 'areas'),
  });
};

const useExperience = () => {
  return useQuery({
    queryKey: [ApiTags.GET_EXPERIENCE],
    queryFn: async () => hhService.getExperience(),
    select: (data) => recurseFunc(data, 'industries'),
  });
};

const useCountries = () => {
  return useQuery({
    queryKey: [ApiTags.GET_COUNTRIES],
    queryFn: async () => hhService.getCountries(),
    select: (data) =>
      data.map((countrie: any) => {
        return {
          value: countrie.id,
          label: countrie.name,
        };
      }),
  });
};

const useProfessionalRoles = () => {
  return useQuery({
    queryKey: [ApiTags.GET_PROFESSIONAL_ROLES],
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
  });
};

export { useAreas, useExperience, useCountries, useProfessionalRoles };
