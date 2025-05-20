import { create } from 'zustand';

export const useScheduleStore = create((set) => ({
  places: [], // 관광지 목록
  details: [], // 상세 일정들

  setPlaces: (newPlaces) => set({ places: newPlaces }),

  setDetail: (index, key, value) =>
    set((state) => {
      const newDetails = [...state.details];
      newDetails[index] = {
        ...newDetails[index],
        [key]: value,
      };
      return { details: newDetails };
    }),
}));
