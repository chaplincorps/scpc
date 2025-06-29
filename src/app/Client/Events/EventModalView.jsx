'use client'


import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Building2, Share2, Check } from "lucide-react"
import Image from "next/image"
import EventModalLogic from "./EventModalLogic"



export default function EventModalview({ event, isOpen, onClose }){
  const {
      isShared,
      handleShare,
      modalRef,
      closeButtonRef} = EventModalLogic({ event, isOpen, onClose })
      
  if (!isOpen) return null

    return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {/* Fixed Header */}
        <div className="flex items-start justify-between p-8 pb-6">
          <div className="flex-1 pr-6">
            <h2 id="modal-title" className="mb-3 text-2xl font-bold leading-tight text-gray-900">
              <span className="border-b-2 border-[#006699] pb-1 text-[15px] " >{event.name}</span>
            </h2>
            <div className="flex flex-col gap-3 text-gray-600 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#006699]" />
                <Badge variant="outline" className="border-[#006699] text-[#006699] font-medium">
                  {event.stateCommand}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              size="icon"
              className="hover:bg-[#006699] hover:text-white hover:border-[#006699] transition-colors duration-200"
              aria-label="Share event"
            >
              {isShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </Button>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-8 pb-8 space-y-6 overflow-y-auto">
          {/* Hero Image */}
          <div className="relative overflow-hidden shadow-lg h-72 rounded-xl">
            <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          </div>

          {/* Date and Time */}
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="mb-1 text-lg font-semibold text-gray-900">Event Details</div>
            <div className="text-gray-700">
              <span className="font-medium">{event.date}</span> · <span>{event.time}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About This Event</h3>
            <div className="prose prose-gray max-w-none">
              {event.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-700 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}