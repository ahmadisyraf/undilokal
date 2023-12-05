import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useObjectStore = create(
  persist(
    (set, get) => ({
      objects: [],
      addObject: (newObject) =>
        set((state) => ({ objects: [...state.objects, newObject] })),
      submitted: false,
      setSubmitted: (value) => set({ submitted: value }),
    }),
    {
      name: "object-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


export default useObjectStore