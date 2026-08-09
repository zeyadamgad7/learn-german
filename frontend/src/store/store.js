import { create } from 'zustand';

const useStore = create((set) => ({
  analysis: null,
  setAnalysis: (newAnalysis) => set({ analysis: newAnalysis }),

  text: '',
  setText: (newText) => set({ text: newText }),

  enterPressed: false,
  setEnterPressed: (status) => set({ enterPressed: status }),

  checked_part_of_speech: true,
  setChecked_part_of_speech: (status) => set({ checked_part_of_speech: status }),

  checked_case: true,
  setChecked_case: (status) => set({ checked_case: status }),

  checked_role: true,
  setChecked_role: (status) => set({ checked_role: status }),

  checked_explanation: true,
  setChecked_explanation: (status) => set({ checked_explanation: status }),

  original_text: '',
  setOriginalText: (status) => set({ original_text: status }),

  source_language: '',
  setSourceLanguage: (status) => set({ source_language: status }),

  target_language: '',
  setTargetLanguage: (status) => set({ target_language: status }),

  action: '',
  setAction: (status) => set({ action: status }),

  translation: '',
  setTranslation: (newTranslation) => set({ translation: newTranslation }),

  label: '',
  setLabel: (status) => set({ label: status}),

  sourceLabel: 'Source Language',
  setSourceLabel: (status) => set({ sourceLabel: status }),

  targetLabel: 'Target Language',
  setTargetLabel: (status) => set({ targetLabel: status }),

  loading: false,
  setLoading: (status) => set({ loading: status }),

  reviewText: '',
  setReviewText: (status) => set({ reviewText: status }),

  correction: '',
  setCorrection: (status) => set({ correction: status }),

  wrongWords: [],
  setWrongWords: (status) => set({ wrongWords: status }),

  correctedWords: [],
  setCorrectedWords: (status) => set({ correctedWords: status }),

  reviewExplanation: '',
  setReviewExplanation: (status) => set({ reviewExplanation: status }),

}));

export default useStore;
