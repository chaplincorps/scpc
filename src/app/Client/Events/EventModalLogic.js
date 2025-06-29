'use client'

import { useEffect, useRef, useState } from "react"


export default function EventModalLogic({event, isOpen, onClose}){
    const modalRef = useRef(null)
    const closeButtonRef = useRef(null)
    const [isShared, setIsShared] = useState(false)

    const handleShare = async () => {
    const eventUrl = `${window.location.origin}/events/${event.id}`

   try {
      if (navigator.share) {
      await navigator.share({
         title: event.name,
         text: `Check out this event: ${event.name}`,
         url: eventUrl,
      })
      } else {
      await navigator.clipboard.writeText(eventUrl)
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
      }
   } 
   catch (error) {
      // Fallback to clipboard
      try {
      await navigator.clipboard.writeText(eventUrl)
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
      } 
      catch (clipboardError) {
      console.error("Failed to share or copy link:", clipboardError)
      }
   }
  }

    useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden"

      // Focus the close button for accessibility
      closeButtonRef.current?.focus()

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose()
        }
      }

      document.addEventListener("keydown", handleEscape)

      return () => {
        document.body.style.overflow = "unset"
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1] 

      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      return () => document.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

   return {
      isShared,
      handleShare,
      modalRef,
      closeButtonRef,
   }

}