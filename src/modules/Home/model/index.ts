import { useMutation } from "@tanstack/react-query";
import { SearchService } from "@common/api/services/search";
import {
   IResponseSearchGpt,
   ISearchGpt,
} from "@common/api/services/search/types";
import { useAppDispatch } from "@/common/hooks";
import { setResumes } from "@/store/slices/resumes.slice";
import { useNavigate } from "react-router-dom";
import { setHistory } from "@/store/slices/historys.slice";
import { AxiosError } from "axios";

const useCreateSearch = (getValues: () => void) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: async (data: ISearchGpt) => {
         return await SearchService.getSearch(data);
      },
      onSuccess(data: IResponseSearchGpt) {
         dispatch(setResumes(data.listCandidates.items));
         navigate("/candidates");
         dispatch(setHistory(getValues()));
      },
      onError: (error: AxiosError<{ message: string }>) => {
         return error.response?.data?.message;
      },
   });
};

export default useCreateSearch;
