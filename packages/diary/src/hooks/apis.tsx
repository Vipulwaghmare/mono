import api from "@/apis/instance";
import { useMutation } from "@tanstack/react-query";
import { UpdatePersonalNotesResponseDto } from "@vipulwaghmare/apis";

export const useUpdatePersonalNote = (data: UpdatePersonalNotesResponseDto) => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.diaryControllerPutPersonalEntry(data);
      return res.data;
    },
  });
};
