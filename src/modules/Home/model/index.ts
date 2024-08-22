import { useMutation } from "@tanstack/react-query";
import { SearchService } from "../../../api/search";
import ISearchGpt from "../../../api/search/types";

const useCreateSearch = (
   setState: React.Dispatch<React.SetStateAction<ISearchGpt | null>>
) => {
   return useMutation({
      mutationFn: async (data: ISearchGpt) => {
         return await SearchService.getSearch(data);
      },
      onSuccess(data: ISearchGpt) {
         setState(data);
      },
      onError(error) {
         console.error("Ошибка при выполнении запроса:", error);
      },
   });
};

export default useCreateSearch;
