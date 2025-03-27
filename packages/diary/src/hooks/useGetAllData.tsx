import api from "@/apis/instance";
import { useQuery } from "@tanstack/react-query";
import { GetAllDiaryDataResponseDto } from "@vipulwaghmare/apis";

const useGetAllData = (date: string) => {
  return useQuery<any, any, GetAllDiaryDataResponseDto>({
    queryKey: ["all-data"],
    queryFn: async () => {
      console.log(date);
      const res = await api.diaryControllerGetAllData();
      return res.data;
    },
  });
};

export default useGetAllData;
