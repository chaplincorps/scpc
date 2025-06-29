'use client'

import { useState, useEffect } from "react"
import { X, Share,Check,ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import PlaceHolder from "@/Images/Placeholder.png"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image"


// Mock data - replace with your actual data fetching
const mockGalleryItems = [
  {
    id: "1",
    title: "Summer Festival 2024",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "2",
    title: "Corporate Retreat",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "3",
    title: "Product Launch Event",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "4",
    title: "Team Building Workshop",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "5",
    title: "Annual Conference",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "6",
    title: "Holiday Celebration",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "7",
    title: "Client Appreciation Dinner",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "8",
    title: "Innovation Summit",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "9",
    title: "Quarterly Review Meeting",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "10",
    title: "Spring Networking Event",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "11",
    title: "Awards Ceremony",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "12",
    title: "Training Workshop",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "13",
    title: "Company Picnic",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "14",
    title: "Board Meeting",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
  {
    id: "15",
    title: "Customer Success Summit",
    thumbnail: PlaceHolder,
    fullImage: PlaceHolder,
  },
]

// Skeleton Card Component
function SkeletonCard(){
   return(
   <div className="overflow-hidden bg-white rounded-lg shadow-sm">
      <Skeleton className="bg-[#006699] aspect-[3/2] w-full" />
      <div className="p-3">
        <Skeleton className="bg-[#006699] w-1/2 h-4 " />
      </div>
   </div>
   )
}

// Gallery Card Component
function GalleryCard({ item, onClick }) {
  const [shared, setShared] = useState(false);

     const handleShare = async (e) => {
    e.stopPropagation()
    const shareUrl = `${window.location.origin}/Images/${item.id}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: event.name,
          text: `Check out this image: ${event.name}`,
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (error) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (clipboardError) {
        console.error("Failed to share or copy link:", clipboardError)
      }
    }
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-[#006699]/20 focus-within:ring-2 focus-within:ring-[#006699]/40 relative group"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="aspect-[3/2] overflow-hidden relative">
        <Image
          src={item.thumbnail}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
        />

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#006699]/40"
          aria-label={`Copy image URL for ${item.title}`}
          tabIndex={0}
        >
          {shared ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Share className="w-4 h-4 text-[#006699]" />
          )}
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-base font-medium leading-tight text-gray-900 line-clamp-2">{item.title}</h3>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(90vh-49px)]">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#006699] flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-[#006699] mb-2">No gallery yet</h2>
        <p className="text-lg text-gray-600">No image have been added yet</p>
      </div>
    </div>
  )
}

// Full Screen Overlay Component
function FullScreenOverlay({
  item,
  isOpen,
  onClose,
}) {
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (item) {
      setImageLoading(true)
    }
  }, [item])

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] max-w-5xl md:w-[90vw] md:max-w-4xl lg:w-[80vw] lg:max-w-3xl xl:w-[70vw] xl:max-w-2xl p-0 bg-white flex flex-col">
        <DialogHeader className="sticky top-0 z-10 px-6 py-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="pr-8 text-xl font-bold text-gray-900">{item.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#006699] hover:bg-[#006699]/10 flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center flex-1 p-2 overflow-auto md:p-6">
          <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
            {imageLoading && (
              <Skeleton className="w-full max-h-[80vh] aspect-auto rounded-lg" />
            )}
            <Image
              src={item.fullImage}
              alt={item.title}
              fill={false}
              width={800}
              height={600}
              className={`w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition-opacity duration-300 ${
                imageLoading ? "opacity-0 absolute inset-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function GalleryLogic(){
  const [isLoading, setIsLoading] = useState(true)
  const [galleryItems, setGalleryItems] = useState ([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8) 

  // Calculate pagination values
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = galleryItems.slice(startIndex, endIndex)

  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1)
  }, [galleryItems])

  const handleCardClick = (item) => {
    setSelectedItem(item)
    setOverlayOpen(true)
  }

  const handleCloseOverlay = () => {
    setOverlayOpen(false)
    setSelectedItem(null)
  }
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Change setGalleryItems(mockGalleryItems) to setGalleryItems([]) to see empty state
      setGalleryItems([]) 
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return{
   isLoading,
   GalleryCard,
   galleryItems,
   EmptyState,
   SkeletonCard,
   handleCardClick,
   handleCloseOverlay,
   totalPages,
   currentItems,
   setCurrentPage,
   currentPage,
   selectedItem,
   overlayOpen,
   FullScreenOverlay
  }
}