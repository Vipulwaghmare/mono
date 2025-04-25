import api from "@/apis/instance";
import { useQuery } from "@tanstack/react-query";
import { GetAllDiaryDataResponseDto } from "@vipulwaghmare/apis";

const useGetAllData = (date: string) => {
  return useQuery<GetAllDiaryDataResponseDto, Error>({
    queryKey: ["all-data", date],
    queryFn: async () => {
      const res = await api.diaryControllerGetAllData({
        date,
      });
      return res.data;
    },
  });
};

export default useGetAllData;
