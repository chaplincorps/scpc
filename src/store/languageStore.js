'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultLanguage = 'en'

const useLanguageStore = create(
  persist(
    (set) => ({
      currentLanguage: defaultLanguage,
      setLanguage: (language) => {
        set({ currentLanguage: language })
      },
      languages: [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
      ],
    }),
    {
      name: 'language-storage',
    }
  )
)

export { useLanguageStore } 