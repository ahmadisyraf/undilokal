import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useObjectStore = create(
  persist(
    (set, get) => ({
      objects: [],
      addObject: (newObject) =>
        set((state) => ({ objects: [...state.objects, newObject] })),
      // removeObject: (index) => set((state) => ({ objects: state.objects.filter((_, i) => i !== index) })),
    }),
    {
      name: 'object-store', // Unique name for the persisted data
      storage: createJSONStorage(() => sessionStorage), // Use localStorage as the storage mechanism
    }
  )
);

export default useObjectStore;
