import { create } from 'zustand';

const useStore = create((set) => ({
  analysis: null,
  setAnalysis: (newAnalysis) => set({ analysis: newAnalysis }),

  text: '',
  setText: (newText) => set({ text: newText }),
}));

export default useStore;
