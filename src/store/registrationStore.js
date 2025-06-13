import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export const useRegistrationStore = create(
   persist(
      (set) => ({
         email: '',
         applicationId: '',
         setEmail: (newEmail) => set({ email: newEmail }),
         clearEmail: () => set({ email: '' }),
         setApplicationId: (newId) => set({ applicationId: newId }),
         clearApplicationId: () => set({ applicationId: '' }),
      }),
      {
         name: 'registration-storage', 
         getStorage: () => sessionStorage, 
      }
   )
)
