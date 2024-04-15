import { Site } from "@prisma/client";
import { create } from "zustand";

interface useGlobalState {
  isLoading: boolean;
  site: Site | null;
  setIsLoading: (loading: boolean) => void;
  setSite: (site: Site | null) => void;
}

export const useGlobalStore = create<useGlobalState>((set) => ({
  isLoading: false,
  site: null,
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSite: (site) => set({ site }),
}));
