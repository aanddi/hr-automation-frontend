import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { ScoreballService } from "@common/api/services/scoreball";
import { IResume } from "@common/api/services/search/types";

const useAnalyzeResumes = () => {
   // const navigate = useNavigate();
   return useMutation({
      mutationFn: async (resumes: IResume[]) => {
         return await ScoreballService.createScoreball(resumes);
      },
      onSuccess(data) {
         console.log(data);
         // navigate("/candidates");
      },
      onError(err: any) {
         console.error(
            "Ошибка при выполнении метода => useAnalyzeResumes",
            err
         );
         return err.response?.data?.message;
      },
   });
};

export default useAnalyzeResumes;
