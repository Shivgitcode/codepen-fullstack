import { create } from "zustand"

export const useCodeStore = create((set) => ({
    myLangs: { html: "", css: "", js: "" },
    onePen: {},
    setLang: (data) => set((state) => ({ onePen: data })),
    handleMyLangs: (code, name) => set((state) => ({ myLangs: { ...state.myLangs, [name]: code } })),
    setMyLangs: (val) => set((state) => ({ myLangs: val }))

}))