import { useMutation } from "@tanstack/react-query";
import { SearchService } from "@api/search";
import { IResponseSearchGpt, ISearchGpt } from "@api/search/types";

const useCreateSearch = (
   setState: React.Dispatch<React.SetStateAction<string>>
) => {
   return useMutation<IResponseSearchGpt, Error, ISearchGpt>({
      mutationFn: async (data: ISearchGpt) => {
         return await SearchService.getSearch(data);
      },
      onSuccess(data: IResponseSearchGpt) {
         setState(data.generatedQuery);
      },
      onError(error) {
         console.error("Ошибка при выполнении запроса:", error);
      },
   });
};

export default useCreateSearch;
