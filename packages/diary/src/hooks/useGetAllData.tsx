import api from "@/apis/instance";
import { useQuery } from "@tanstack/react-query";
import { GetAllDiaryDataResponseDto } from "@vipulwaghmare/apis";

const useGetAllData = (date: string) => {
  return useQuery<any, any, GetAllDiaryDataResponseDto>({
    queryKey: ["all-data"],
    queryFn: async () => {
      const res = await api.diaryControllerGetAllData(date, {});
      return res.data;
    },
  });
};

export default useGetAllData;
