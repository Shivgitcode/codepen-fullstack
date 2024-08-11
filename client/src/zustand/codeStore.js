import { create } from "zustand"

export const useCodeStore = create((set) => ({
    myLangs: { html: "", css: "", js: "" },
    handleMyLangs: (code, name) => set((state) => ({ myLangs: { ...state.myLangs, [name]: code } }))

}))