import { create } from "zustand";

type ColapseState = {
  colapse: boolean;
  setColapse: (show: boolean) => void;
};

export const useColapse = create<ColapseState>((set) => ({
  colapse: false,
  setColapse: (show) => set(() => ({ colapse: show })),
}));
