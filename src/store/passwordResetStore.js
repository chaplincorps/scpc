import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export const usePasswordResetStore = create (
    persist(
      (set) => ({
         email: '',
         setEmail: (newEmail) => set({ email: newEmail }),
         clearEmail: () => set({ email: '' })
      }),
      {
         name: 'registration-storage', 
         getStorage: () => sessionStorage, 
      }
   )
)