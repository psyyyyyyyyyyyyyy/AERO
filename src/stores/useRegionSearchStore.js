import { create } from "zustand";

export const useRegionSearchStore = create((set) => ({
  filters: {
    areaCode: "1",
    sigunguCode: "",
    facilityFilters: [],
    themeFilters: [],
    sortBy: "likes",
    page: 0,
    size: 10,
  },
  regionName: "서울",
  setRegionName: (name) => set({ regionName: name }),

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
