import api, { userApi } from "@/apis/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreatePersonalNotesResponseDto,
  CreateWorkNotesResponseDto,
  CreateHealthNotesResponseDto,
  CreateGymNotesResponseDto,
  UpdatePersonalNotesResponseDto,
  UpdateWorkNotesResponseDto,
  UpdateHealthNotesResponseDto,
  UpdateGymNotesResponseDto,
  DeletePersonalEntryDto,
  DeleteWorkEntryDto,
  DeleteHealthEntryDto,
  DeleteGymEntryDto,
} from "@vipulwaghmare/apis";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userApi.usersControllerGetUser({});
      return res.data;
    },
  });
};

export const useCreatePersonalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreatePersonalNotesResponseDto) => {
      const res = await api.diaryControllerPostPersonalEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useCreateWorkNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateWorkNotesResponseDto) => {
      const res = await api.diaryControllerPostWorkEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useCreateHealthNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateHealthNotesResponseDto) => {
      const res = await api.diaryControllerPostHealthEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useCreateGymNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateGymNotesResponseDto) => {
      const res = await api.diaryControllerPostGymEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useUpdatePersonalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdatePersonalNotesResponseDto) => {
      const res = await api.diaryControllerPutPersonalEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useUpdateWorkNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateWorkNotesResponseDto) => {
      const res = await api.diaryControllerPutWorkEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useUpdateHealthNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateHealthNotesResponseDto) => {
      const res = await api.diaryControllerPutHealthEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useUpdateGymNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateGymNotesResponseDto) => {
      const res = await api.diaryControllerPutGymEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useDeletePersonalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeletePersonalEntryDto) => {
      const res = await api.diaryControllerDeletePersonalEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useDeleteWorkNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteWorkEntryDto) => {
      const res = await api.diaryControllerDeleteWorkEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useDeleteHealthNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteHealthEntryDto) => {
      const res = await api.diaryControllerDeleteHealthEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};

export const useDeleteGymNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteGymEntryDto) => {
      const res = await api.diaryControllerDeleteGymEntry(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-data"] });
    },
  });
};
