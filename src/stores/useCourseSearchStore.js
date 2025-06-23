import { create } from "zustand";

export const useCourseSearchStore = create((set) => ({
  filters: {
    theme: "자연관광",
    barrierFree: "",
    type: "ai",
    sortBy: "like",
    page: 0,
    size: 10,
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  resetPage: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        page: 0,
      },
    })),
}));
