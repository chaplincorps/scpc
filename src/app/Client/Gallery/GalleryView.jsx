'use client'

import GalleryLogic from "./GalleryLogic"
import { Pagination } from "@/components/custom/Pagination"

export default function GalleryView(){
const {
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
   FullScreenOverlay,
   overlayOpen,} = GalleryLogic()

   return(
      <div className="flex min-h-[calc(100vh-49px)] lg:flex-row bg-white" >
         <div className="container px-4 py-8 mx-auto"> 
              {isLoading ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {Array.from({ length: 12 }).map((_, index) => (
                        <SkeletonCard key={index} />
                     ))}
                  </div>
               ): galleryItems.length === 0 ? (
                    <EmptyState />
               ): (
                  <>
                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {currentItems.map((item) => (
                           <GalleryCard key={item.id} item={item} onClick={() => handleCardClick(item)} />
                        ))}
                     </div>

         
                     <div className="fixed bottom-0 left-0 z-10 w-full py-4 shadow-none bg-white/20 backdrop-blur-sm">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                     </div>
                  </>
               )}
               
            <FullScreenOverlay item={selectedItem} isOpen={overlayOpen} onClose={handleCloseOverlay} />
         </div>
      </div>
   )
}