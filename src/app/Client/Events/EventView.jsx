'use client'
import EventLogic from "./EventLogic"
import EventModalview from "./EventModalView"

export default function EventView(){
   const { 
      EventGrid,
      selectedEvent,
      setSelectedEvent} = EventLogic()

   return(
         <div className="flex min-h-[calc(100vh-49px)] lg:flex-row bg-white" >
            <div className="container px-4 py-12 mx-auto">
               < EventGrid />
               {selectedEvent && (
                  <EventModalview event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
               )}
            </div>
         </div>
   )
}