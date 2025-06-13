'use client'

export default function AccessInBridgeUI() {
  return (
   <div
      className="relative p-4 bg-gradient-to-br from-gray-50 to-blue-50 md:p-6"
      style={{ height: "calc(100vh - 49px)" }}
    >
      {/* Foreground Loading Message - Centered and Prominent */}
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-[#006699] border-opacity-30 p-8 md:p-12 max-w-md mx-4 text-center animate-fade-in">
          {/* Loading Title */}
          <h2
            className="text-xl font-bold text-[#006699] mb-3 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            Loading Application Dashboard
          </h2>

          {/* Loading Description */}
          <p
            className="text-sm text-[#006699] opacity-80 mb-6 leading-relaxed animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            Please wait while we prepare your application space...
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 animate-fade-in" style={{ animationDelay: "900ms" }}>
            <div className="w-2 h-2 bg-[#006699] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-[#006699] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-[#006699] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 