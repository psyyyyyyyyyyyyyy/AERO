import { create } from "zustand";

export const useScheduleStore = create((set) => ({
  schedulesByDay: {}, // 예: { 1: [{ value, contentId, mapX, mapY }], 2: [...], ... }
  detailsByDay: {}, // 예: { 1: [{ time, description }], 2: [...], ... }

  setPlacesForDay: (day, places) =>
    set((state) => ({
      schedulesByDay: {
        ...state.schedulesByDay,
        [day]: places,
      },
    })),

  //개별 관광지 상세 필드 수정
  setDetailForDay: (day, index, key, value) =>
    set((state) => {
      const prevDetails = state.detailsByDay[day] || [];
      const updatedDetails = [...prevDetails];
      if (!updatedDetails[index]) updatedDetails[index] = {};
      updatedDetails[index][key] = value;
      return {
        detailsByDay: {
          ...state.detailsByDay,
          [day]: updatedDetails,
        },
      };
    }),

  //상세 내용 배열 전체를 바꿔치기 (드래그 전용)
  setDetailsForDay: (day, newDetails) =>
    set((state) => ({
      detailsByDay: {
        ...state.detailsByDay,
        [day]: newDetails,
      },
    })),
    
    // store 초기화
  resetStore: () =>
    set({
      schedulesByDay: {},
      detailsByDay: {},
    }),
}));
