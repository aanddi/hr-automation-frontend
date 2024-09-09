import { useMutation } from "@tanstack/react-query";
import { SearchService } from "@common/api/services/search";
import { IResponseSearchGpt, ISearchGpt } from "@common/api/services/search/types";
import { useAppDispatch } from "@/common/hooks";
import { setResumes } from "@/store/slices/resumes.slice";
import { useNavigate } from "react-router-dom";

const useCreateSearch = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   
   return useMutation<IResponseSearchGpt, Error, ISearchGpt>({
      mutationFn: async (data: ISearchGpt) => {
         return await SearchService.getSearch(data);
      },
      onSuccess(data: IResponseSearchGpt) {
         dispatch(setResumes(data.listCandidates.items));
         navigate("/candidates");
      },
      onError: (err: any) => {
         return err.response?.data?.message;
      },
   });
};

export default useCreateSearch;
