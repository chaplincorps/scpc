"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image1 from "@/images/Image_1.jpg"
import Image2 from "@/images/Image_2.jpg"
import Image3 from "@/images/Image_3.jpg"
import Image4 from "@/images/Image_4.jpg"
import { useTranslation } from "@/utils/translations"
 
export default function HeroCarousel() {
  const { translate } = useTranslation()

  const slides = [
    {
      image: Image1,
      title: translate('onboarding.carousel.slide1.title'),
      subtitle: translate('onboarding.carousel.slide1.subtitle'),
      description: translate('onboarding.carousel.slide1.description'),
      ctaText: translate('onboarding.carousel.slide1.ctaText'),
      ctaLink: "#apply",
    },
    {
      image: Image2,
      title: translate('onboarding.carousel.slide2.title'),
      subtitle: translate('onboarding.carousel.slide2.subtitle'),
      description: translate('onboarding.carousel.slide2.description'),
      ctaText: translate('onboarding.carousel.slide2.ctaText'),
      ctaLink: "#initiatives",
    },
    {
      image: Image3,
      title: translate('onboarding.carousel.slide3.title'),
      subtitle: translate('onboarding.carousel.slide3.subtitle'),
      description: translate('onboarding.carousel.slide3.description'),
      ctaText: translate('onboarding.carousel.slide3.ctaText'),
      ctaLink: "#presence",
    },
    {
      image: Image4,
      title: translate('onboarding.carousel.slide4.title'),
      subtitle: translate('onboarding.carousel.slide4.subtitle'),
      description: translate('onboarding.carousel.slide4.description'),
      ctaText: translate('onboarding.carousel.slide4.ctaText'),
      ctaLink: "#apply",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setCurrentSlide(index)

      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 750)
    },
    [isTransitioning],
  )

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide, slides.length])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide, slides.length])

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  return (
    <div
      className="relative w-full h-[93vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out
            ${index === currentSlide ? "opacity-100 z-3" : "opacity-0 z-0"}`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#006699]/90 via-[#006699]/75 to-transparent"></div>
          </div>

          {/* Slide Content */}
          <div className="relative z-4 h-full flex items-center">
            <div className="container mx-auto px-3 md:px-22">
              <div className="max-w-3xl">
                <div
                  className={`transition-all duration-1000 delay-100 transform
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6">
                    {slide.subtitle}
                  </span>
                </div>

                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-1000 delay-200 transform
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  {slide.title}
                </h1>

                <p
                  className={`text-xl md:text-2xl text-white/80 max-w-2xl mb-8 transition-all duration-1000 delay-300 transform
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  {slide.description}
                </p>

                <div
                  className={`transition-all duration-1000 delay-400 transform
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <Button
                    className="bg-white text-[#006699] hover:bg-white/90 px-8 py-7 text-lg rounded-full group"
                    asChild
                  >
                    <a href={slide.ctaLink}>
                      {slide.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${currentSlide === index ? "bg-white w-10" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`${translate('onboarding.carousel.goToSlide')} ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
        onClick={prevSlide}
        aria-label={translate('onboarding.carousel.previousSlide')}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
        onClick={nextSlide}
        aria-label={translate('onboarding.carousel.nextSlide')}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-white/50 z-30">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${(currentSlide + 1) * (100 / slides.length)}%`,
            transitionDuration: isPaused ? "0ms" : "6000ms",
          }}
        />
      </div>
    </div>
  )
}
