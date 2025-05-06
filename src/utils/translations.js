'use client'

import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/languageStore'

// Import all translation files
import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import es from '@/translations/es.json'
import de from '@/translations/de.json'
import zh from '@/translations/zh.json'
import ar from '@/translations/ar.json'

const translations = {
  en,
  fr,
  es,
  de,
  zh,
  ar
}

export function useTranslation() {
  const storeLanguage = useLanguageStore(state => state.currentLanguage)
  const [currentLanguage, setCurrentLanguage] = useState(storeLanguage)
  
  // Force re-render when language changes
  useEffect(() => {
    if (storeLanguage !== currentLanguage) {
      setCurrentLanguage(storeLanguage)
    }
  }, [storeLanguage, currentLanguage])
  
  const translate = (key) => {
    try {
      // Handle empty or missing key
      if (!key) return ''
      
      // Split the key by dots to access nested properties
      const keys = key.split('.')
      
      // Make sure we have a valid language or fallback to English
      const lang = translations[currentLanguage] ? currentLanguage : 'en'
      let translation = translations[lang]
      
      // If translation doesn't exist at all, return the key
      if (!translation) return key
      
      // Navigate through nested properties
      for (const k of keys) {
        if (!translation || typeof translation !== 'object') {
          // If we hit a non-object before we're done with keys, use fallback
          console.warn(`Translation path broken for key: ${key} in language: ${lang}`)
          translation = undefined
          break
        }
        translation = translation[k]
      }
      
      // If we didn't find a translation, try English as fallback
      if (translation === undefined && lang !== 'en') {
        translation = translations.en
        for (const k of keys) {
          if (!translation || typeof translation !== 'object') {
            translation = undefined
            break
          }
          translation = translation[k]
        }
      }
      
      // Return the translation, the English fallback, or the original key
      return translation !== undefined ? translation : key
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return { translate, currentLanguage }
} 