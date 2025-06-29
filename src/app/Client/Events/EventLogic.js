'use client'

import { useState, useEffect ,useMemo} from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { 
   MapPin, 
   Building2, 
   Calendar, 
   ArrowRight, 
   Share2, 
   Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Pagination } from "@/components/custom/Pagination";
import eventsData from "./events.json";
import { useSidebar } from "@/components/ui/sidebar";


function EmptyState() {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(90vh-49px)]">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-[#006699]">
          <Calendar className="w-12 h-12 text-white" />
        </div>
         <h2 className="text-2xl font-semibold text-[#006699] mb-2">No event yet</h2>
         <p className="text-lg text-gray-600">No events have been added yet</p>
      </div>
    </div>
  )
}

function EventSkeleton(){
     return (
    <div className="p-8 bg-white border border-gray-100 rounded-2xl">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Image Skeleton */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <Skeleton className="aspect-[4/3] lg:aspect-[3/2] rounded-xl w-full h-full bg-[#006699]" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Badge Skeleton */}
          <Skeleton className="w-32 h-6 rounded-full bg-[#006699]" />

          {/* Title Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 rounded-lg bg-[#006699]" />
            <Skeleton className="w-3/4 h-8 rounded-lg bg-[#006699]" />
          </div>

          {/* Meta Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-64 h-5 rounded bg-[#006699]" />
            <Skeleton className="h-5 w-80 rounded bg-[#006699]" />
          </div>

          {/* Description Skeleton */}
          <div className="pt-2 space-y-2">
            <Skeleton className="h-4 rounded bg-[#006699]" />
            <Skeleton className="h-4 rounded bg-[#006699]" />
            <Skeleton className="w-2/3 h-4 rounded bg-[#006699]" />
          </div>

          {/* Action Skeleton */}
          <div className="pt-6">
            <Skeleton className="w-40 h-5 rounded bg-[#006699]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onClick}){
   const [isShared, setIsShared] = useState(false)

  // Determine if description is short enough to display fully
  const firstParagraph = event.description.split("\n\n")[0]
  const isShortDescription = firstParagraph.length <= 250
  const shouldShowButton = !isShortDescription || event.description.includes("\n\n")
  
   const handleShare = async (e) => {
    e.stopPropagation()
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
    } catch (error) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(eventUrl)
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      } catch (clipboardError) {
        console.error("Failed to share or copy link:", clipboardError)
      }
    }
  }
     return (
    <div className="w-full px-2 py-8 my-3 transition-all duration-300 bg-white border border-gray-100 shadow-lg group rounded-2xl hover:border-gray-200 hover:shadow-2xl">
      <div className="flex flex-col w-full gap-8 lg:flex-row">
        {/* Image */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 min-h-0">
          {/* Header */}
          <div className="space-y-4">
            {/* Command Badge and Share Button */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-[#006699] text-[#006699] font-medium">
                <Building2 className="w-3 h-3 mr-1" />
                {event.stateCommand}
              </Badge>

              {/* Share button for events without modal */}
              {!shouldShowButton && (
                <Button
                  onClick={handleShare}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-100 text-gray-500 hover:text-[#006699] transition-colors duration-200"
                  aria-label="Share event"
                >
                  {isShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </Button>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-[#006699]/90 leading-tight group-hover:text-[#006699] transition-colors duration-200">
              {event.name}
            </h3>

            {/* Meta Information */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <span className="font-medium">{event.date}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="leading-relaxed text-gray-600">
              {isShortDescription && !event.description.includes("\n\n") ? (
                // Show full description if it's short and single paragraph
                <p>{event.description}</p>
              ) : (
                // Show truncated description if it's long or has multiple paragraphs
                <p className="line-clamp-3">{firstParagraph}</p>
              )}
            </div>
          </div>

          {/* Action */}
          {shouldShowButton && (
            <div className="pt-6">
              <Button
                onClick={onClick}
                variant="ghost"
                className="group/btn p-0 h-auto font-medium text-[#006699] hover:text-[#005580] hover:bg-transparent cursor-pointer"
              >
                View complete Detail
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EventLogic() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState([]);
  const ITEMS_PER_PAGE = 10;

  // Simulate loading and load events from JSON
  useEffect(() => {
    const timer = setTimeout(() => {
      // To test empty state, change this to: setAllEvents([])
      // To test with events, use: setAllEvents(eventsData)
      setAllEvents([]);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { totalPages, showPagination, isEmpty, paginatedEvents } = useMemo(() => {
    const total = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = allEvents.slice(startIndex, endIndex);
    return {
      paginatedEvents: paginated,
      totalPages: total,
      showPagination: allEvents.length >= 5,
      isEmpty: allEvents.length === 0,
    };
  }, [allEvents, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function EventGrid() {
    if (isLoading)
      return (
        <div className="w-full mx-auto">
          <div className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        </div>
      );

    if (isEmpty) {
      return <EmptyState />;
    }

    // Detect sidebar and mobile mode
    let left = 0;
    let width = "100vw";
    let isMobile = false;
    let sidebarState;
    try {
      const sidebar = useSidebar();
      sidebarState = sidebar.state;
      isMobile = sidebar.isMobile;
    } catch (e) {
      // Sidebar not present
    }

    if (!isMobile && sidebarState) {
      left = sidebarState === "collapsed" ? "3rem" : "16rem";
      width = sidebarState === "collapsed" ? "calc(100vw - 3rem)" : "calc(100vw - 16rem)";
    }

    return (
      <div className="w-full mx-auto">
        <div className="w-full">
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
        </div>

        {showPagination && (
          <div
            className="fixed bottom-0 z-10 flex justify-center py-4 shadow-none bg-white/5 backdrop-blur-sm transition-[left,width] duration-300 ease-in-out"
            style={{ left, width }}
          >
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    );
  }

  return {
    EventGrid,
    selectedEvent,
    setSelectedEvent,
  };
}