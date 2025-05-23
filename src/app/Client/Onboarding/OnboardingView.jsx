import Image from "next/image"
import Link from 'next/link'
import {Users, Heart, Compass, Target, Handshake, Globe, BookOpen, ArrowRight, HeartHandshake, GlobeLock, Globe2, Scale, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/custom/HeroCarousel"
import RevealOnScroll from "@/components/custom/RevealOnScroll"
import CountUp from "react-countup"
import { useTranslation } from "@/utils/translations"


const OnboardingView = () => {
   const { translate } = useTranslation()
      
   return (
         <div className="flex flex-col bg-white overflow-hidden">
         <main className="flex-1">
            {/* Hero Carousel Section */}
            <section className="relative">
               <HeroCarousel />
            </section>

               {/* Mission & Vision Section - Creative layout with overlapping elements */}
               <RevealOnScroll> 
                 <section id="mission" className="flex flex-col items-center px-4 py-24 md:py-32 relative">
                     <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-50/50 to-white z-0"></div>
                     <div className="container relative z-10">
                           <div className="max-w-7xl mx-auto">
                             <RevealOnScroll>
                                 <div className="text-center mb-16">
                                    <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                                    {translate('onboarding.purpose')}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                                    {translate('onboarding.missionVision')}
                                    </h2>
                                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                                    {translate('onboarding.purposeDescription')}
                                    </p>
                                    <div className="h-1 w-20 bg-[#006699] mx-auto mt-8"></div>
                              </div>
                             </RevealOnScroll>

                              <RevealOnScroll>
                                 <div className="bg-[#006699] p-10 rounded-3xl shadow-xl text-white text-center mb-12 transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-32"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 translate-y-32"></div>
                                    <div className="relative z-10">
                                    <span className="text-6xl font-serif text-white/30">"</span>
                                    <p className="text-2xl md:text-3xl font-medium italic mb-6">{translate('onboarding.motto')}</p>
                                    <span className="text-6xl font-serif text-white/30">"</span>
                                    <p className="text-white/80 mt-4">{translate('onboarding.mottoDescription')}</p>
                                    </div>
                                 </div>
                              </RevealOnScroll>

                              <RevealOnScroll>
                                 <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mb-10 transform hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                                       <Target className="w-10 h-10 text-[#006699]" />
                                    </div>
                                    <div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center md:text-left">
                                          {translate('onboarding.mission')}
                                       </h3>
                                       <p className="text-gray-700 text-lg leading-relaxed">
                                          {translate('onboarding.missionDescription')}
                                       </p>
                                       <div className="mt-6 space-y-4">
                                          <div className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-[#006699]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                             <div className="w-2 h-2 rounded-full bg-[#006699]"></div>
                                          </div>
                                          <p className="text-gray-700">
                                             {translate('onboarding.missionPoint1')}
                                          </p>
                                          </div>
                                          <div className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-[#006699]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                             <div className="w-2 h-2 rounded-full bg-[#006699]"></div>
                                          </div>
                                          <p className="text-gray-700">
                                             {translate('onboarding.missionPoint2')}
                                          </p>
                                          </div>
                                          <div className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-[#006699]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                             <div className="w-2 h-2 rounded-full bg-[#006699]"></div>
                                          </div>
                                          <p className="text-gray-700">
                                             {translate('onboarding.missionPoint3')}
                                          </p>
                                          </div>
                                       </div>
                                    </div>
                                    </div>
                                 </div>
                              </RevealOnScroll>

                             <RevealOnScroll>
                                 <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                                       <Compass className="w-10 h-10 text-[#006699]" />
                                    </div>
                                    <div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center md:text-left">{translate('onboarding.vision')}</h3>
                                       <p className="text-gray-700 text-lg leading-relaxed">
                                          {translate('onboarding.visionDescription')}
                                       </p>
                                       <div className="mt-8 bg-[#006699]/5 p-6 rounded-xl">
                                          <p className="text-gray-700 italic">
                                          {translate('onboarding.visionQuote')}
                                          </p>
                                       </div>
                                    </div>
                                    </div>
                                 </div>
                             </RevealOnScroll>
                           </div>
                     </div>
                  </section>
               </RevealOnScroll>

               {/* Core Values Section - Interactive and visually distinctive */}
               <RevealOnScroll>
                  <section id="values" className="flex flex-col items-center px-4 py-24 md:py-32 relative bg-gradient-to-br from-gray-50 via-white to-gray-50">
                     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
                     <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

                     {/* Decorative elements */}
                     <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full border-2 border-[#006699]/20"></div>
                        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border-2 border-[#006699]/20"></div>
                        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border-2 border-[#006699]/20"></div>

                        <div className="container relative z-10">
                           <div className="text-center max-w-3xl mx-auto mb-20">
                           <RevealOnScroll>
                                 <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                                    {translate('onboarding.foundation')}
                                 </div>
                                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">{translate('onboarding.coreValues')}</h2>
                                 <p className="text-gray-700 text-lg">
                                    {translate('onboarding.coreValuesDescription')}
                                 </p>
                           </RevealOnScroll>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                              <RevealOnScroll>
                                 <div className="group h-full flex flex-col">
                                       <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col  items-center relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                       <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                          <BookOpen className="w-10 h-10 text-[#006699]" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.integrity')}</h3>
                                       <p className="text-gray-600 flex-grow">
                                          {translate('onboarding.integrityDescription')}
                                       </p>
                                       <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                       </div>
                                    </div>
                              </RevealOnScroll>

                              <RevealOnScroll>
                                 <div className="group h-full flex flex-col">
                                       <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                       <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                          <Users className="w-10 h-10 text-[#006699]" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.respect')}</h3>
                                       <p className="text-gray-600 flex-grow">
                                          {translate('onboarding.respectDescription')}
                                       </p>
                                       <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                       </div>
                                    </div>
                              </RevealOnScroll>

                              <RevealOnScroll>
                                 <div className="group h-full flex flex-col">
                                       <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                       <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                          <Heart className="w-10 h-10 text-[#006699]" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.compassion')}</h3>
                                       <p className="text-gray-600 flex-grow">
                                          {translate('onboarding.compassionDescription')}
                                       </p>
                                       <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                       </div>
                                    </div>
                              </RevealOnScroll>

                              <RevealOnScroll>
                                 <div className="group h-full flex flex-col">
                                       <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col relative items-center overflow-hidden">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                       <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                          <Handshake className="w-10 h-10 text-[#006699]" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.collaboration')}</h3>
                                       <p className="text-gray-600 flex-grow">
                                          {translate('onboarding.collaborationDescription')}
                                       </p>
                                       <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                       </div>
                                    </div>
                              </RevealOnScroll>
                           </div>
                        </div>
                  </section>
               </RevealOnScroll>

               {/* Partners Section - Sophisticated showcase */}
               <RevealOnScroll>
                  <section id="partners" className="flex flex-col items-center px-4  py-24 md:py-32 relative">
                     <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-fixed bg-cover bg-center opacity-5"></div>
                     <div className="container relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                          <RevealOnScroll>
                           <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                                 {translate('onboarding.globalCollaboration')}
                              </div>
                              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">{translate('onboarding.partners')}</h2>
                              <p className="text-gray-700 text-lg mb-8">
                                 {translate('onboarding.partnersDescription')}
                              </p>
                              <div className="mb-5 h-1 w-20 bg-[#006699] mx-auto"></div>
                          </RevealOnScroll>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  items-stretch">
                           <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                    <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col  items-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                    <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                       <HeartHandshake className="w-10 h-10 text-[#006699]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.ihrc')}</h3>
                                    <p className="text-gray-600 flex-grow">
                                    {translate('onboarding.ihrcDescription')}
                                    </p>
                                    <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                    </div>
                                 </div>
                           </RevealOnScroll>

                           <RevealOnScroll>
                                 <div className="group h-full flex flex-col">
                                       <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col  items-center relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                       <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                          <GlobeLock className="w-10 h-10 text-[#006699]" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.interpol')}</h3>
                                       <p className="text-gray-600 flex-grow">
                                       {translate('onboarding.interpolDescription')}
                                       </p>
                                       <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                       </div>
                                 </div>
                           </RevealOnScroll>  

                           <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                 <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col  items-center relative overflow-hidden">
                                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                 <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                    <Globe2 className="w-10 h-10 text-[#006699]" />
                                 </div>
                                 <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.un')}</h3>
                                 <p className="text-gray-600 flex-grow">
                                 {translate('onboarding.unDescription')}
                                 </p>
                                 <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                 </div>
                              </div>
                           </RevealOnScroll>

                           <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                    <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006699] to-[#0088cc]"></div>
                                    <div className="w-20 h-20 bg-[#006699]/10 rounded-full flex items-center justify-center mb-8">
                                       <Scale className="w-10 h-10 text-[#006699]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.nsa')}</h3>
                                    <p className="text-gray-600 flex-grow">
                                    {translate('onboarding.nsaDescription')}
                                    </p>
                                    <div className="w-12 h-12 rounded-full bg-gray-50 absolute -bottom-6 -right-6 group-hover:bg-[#006699]/5 transition-colors duration-300"></div>
                                    </div>
                              </div>
                           </RevealOnScroll>
                        </div>
                     </div>
                  </section>
               </RevealOnScroll>

               {/* Initiatives Section - Creative approach */}
               <RevealOnScroll>
                  <section id="initiatives" className="flex flex-col items-center px-4  relative py-24 md:py-32 overflow-hidden bg-[#006699]">
                     <div className="container relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                          <RevealOnScroll>
                              <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
                                 {translate('onboarding.programs')}
                              </div>
                              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">{translate('onboarding.initiatives')}</h2>
                              <p className="text-white/80 text-lg">
                                 {translate('onboarding.initiativesDescription')}
                              </p>
                          </RevealOnScroll>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
                          <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                 <div className="bg-white/10 p-10 rounded-3xl relative z-10 h-full flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/30 transition-colors duration-300">
                                       <BookOpen className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-white">{translate('onboarding.spiritualCounseling')}</h3>
                                    <p className="text-white/80 leading-relaxed flex-grow">
                                       {translate('onboarding.spiritualCounselingDescription')}
                                    </p>
                                 </div>
                              </div>
                          </RevealOnScroll>

                          <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                 <div className="bg-white/10 p-10 rounded-3xl relative z-10 h-full flex flex-col items-center">
                                       <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/30 transition-colors duration-300">
                                          <Users className="w-10 h-10 text-white" />
                                       </div>
                                       <h3 className="text-2xl font-semibold mb-4 text-white">{translate('onboarding.interfaithDialogue')}</h3>
                                       <p className="text-white/80 leading-relaxed flex-grow">
                                          {translate('onboarding.interfaithDialogueDescription')}
                                       </p>
                                  </div>
                              </div>
                          </RevealOnScroll>

                          <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                 <div className="bg-white/10 p-10 rounded-3xl relative z-10 h-full flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/30 transition-colors duration-300">
                                       <Heart className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-white">{translate('onboarding.humanitarianAid')}</h3>
                                    <p className="text-white/80 leading-relaxed flex-grow">
                                       {translate('onboarding.humanitarianAidDescription')}
                                    </p>
                                 </div>
                              </div>
                          </RevealOnScroll>

                          <RevealOnScroll>
                              <div className="group h-full flex flex-col">
                                 <div className="bg-white/10  p-10 rounded-3xl relative z-10 h-full flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/30 transition-colors duration-300">
                                       <Globe className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-white">{translate('onboarding.peace')}</h3>
                                    <p className="text-white/80 leading-relaxed flex-grow">
                                       {translate('onboarding.peaceDescription')}
                                    </p>
                                 </div>
                              </div>
                          </RevealOnScroll>
                        </div>
                     </div>
                  </section>
               </RevealOnScroll>

               {/* Geographic Presence Section - Visually engaging map */}
               <RevealOnScroll>
                  <section id="presence" className="flex flex-col items-center px-4 py-24 md:py-32 relative">
                     <div className="container relative z-10">
                       <RevealOnScroll>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                              <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                                 {translate('onboarding.globalImpact')}
                              </div>
                              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-gray-900">
                                 {translate('onboarding.globalPresence')}
                              </h2>
                        </div>
                       </RevealOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-stretch">
                           <RevealOnScroll>
                              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center h-full flex flex-col">
                                 <div className="w-24 h-24 bg-[#006699]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                 <MapPin className="w-12 h-12 text-[#006699]" />
                                 </div>
                                 <h3 className="text-2xl font-semibold mb-2 text-gray-900">{translate('onboarding.nigeriaCommand')}</h3>
                                 <div className="flex items-center justify-center gap-2">
                                    <CountUp
                                       start={0}
                                       end={28}
                                       duration={3}
                                       enableScrollSpy
                                       scrollSpyOnce
                                       scrollSpyDelay={2}
                                       separator=","
                                       >
                                       {({ countUpRef }) => (
                                          <span ref={countUpRef} className="text-6xl font-bold text-[#006699]" />
                                       )}
                                    </CountUp>
                                 <span className="text-xl text-gray-600">{translate('onboarding.states')}</span>
                                 </div>
                                 <p className="mt-4 text-gray-600">
                                 {translate('onboarding.nigeriaCommandDescription')}
                                 </p>
                              </div>
                           </RevealOnScroll>

                          <RevealOnScroll>
                              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center h-full flex flex-col">
                                 <div className="w-24 h-24 bg-[#006699]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                 <Globe className="w-12 h-12 text-[#006699]" />
                                 </div>
                                 <h3 className="text-2xl font-semibold mb-2 text-gray-900">{translate('onboarding.regionalCommand')}</h3>
                                 <div className="flex items-center justify-center gap-2">
                                 <CountUp
                                    start={0}
                                    end={2}
                                    duration={5}
                                    enableScrollSpy
                                    scrollSpyOnce
                                    scrollSpyDelay={2}
                                    separator=","
                                    >
                                    {({ countUpRef }) => (
                                       <span ref={countUpRef} className="text-6xl font-bold text-[#006699]" />
                                    )}
                                 </CountUp>
                                 <span className="text-xl text-gray-600">{translate('onboarding.countries')}</span>
                                 </div>
                                 <p className="mt-4 text-gray-600">
                                 {translate('onboarding.regionalCommandDescription')}
                                 </p>
                              </div>
                          </RevealOnScroll>
                        </div>
                     </div>
                  </section>
               </RevealOnScroll>

               {/* Application Process Section - Creative flow visualization */}
               <RevealOnScroll>
                  <section id="apply" className="flex flex-col items-center px-4 py-24 md:py-32 relative bg-gradient-to-br from-gray-50 via-white to-gray-50">
                     <div className="container relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                           <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                              {translate('onboarding.getInvolved')}
                           </div>
                           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">{translate('onboarding.joinMission')}</h2>
                           <p className="text-gray-700 text-lg">
                              {translate('onboarding.joinMissionDescription')}
                           </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                           <div className="relative">
                              {/* Connection line */}
                              <div className="absolute left-16 top-20 bottom-20 w-1 bg-gradient-to-b from-[#006699] to-[#0088cc] hidden md:block"></div>

                              <div className="space-y-16">
                                 <RevealOnScroll>
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="relative">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step1')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60"></div>
                                    </div>
                                    <div className="md:ml-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1">
                                       <h4 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.createAccount')}</h4>
                                       <p className="text-gray-600 leading-relaxed">
                                       {translate('onboarding.createAccountDescription')}
                                       </p>
                                    </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:ml-16">
                                    <div className="relative order-1 md:order-2">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step2')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-300"></div>
                                    </div>
                                    <div className="md:mr-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1 order-2 md:order-1">
                                       <h4 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.purchaseForm')}</h4>
                                       <p className="text-gray-600 leading-relaxed">
                                       {translate('onboarding.purchaseFormDescription')}
                                       </p>
                                    </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                          <div className="relative">
                                             <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                             <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                                {translate('onboarding.step3')}
                                             </div>
                                             </div>
                                             <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-600"></div>
                                          </div>
                                          <div className="md:ml-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1">
                                             <h4 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.takeAssessment')}</h4>
                                             <p className="text-gray-600 leading-relaxed">
                                             {translate('onboarding.takeAssessmentDescription')}
                                             </p>
                                          </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:ml-16">
                                    <div className="relative order-1 md:order-2">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step4')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-900"></div>
                                    </div>
                                    <div className="md:mr-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1 order-2 md:order-1">
                                       <h4 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.receiveRole')}</h4>
                                       <p className="text-gray-600 leading-relaxed">
                                       {translate('onboarding.receiveRoleDescription')}
                                    </p>
                                 </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="relative">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                          <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                           {translate('onboarding.step5')}
                                          </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-1200"></div>
                                    </div>
                                    <div className="md:ml-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1">
                                       <h4 className="text-2xl font-semibold mb-4 text-gray-900">{translate('onboarding.accessPortal')}</h4>
                                       <p className="text-gray-600 leading-relaxed">
                                          {translate('onboarding.accessPortalDescription')}
                                       </p>
                                    </div>
                                    </div>
                                 </RevealOnScroll>
                           </div>
                        </div>
                        </div>
                     </div>
                  </section>
               </RevealOnScroll>

               {/* CTA Section */}
               <RevealOnScroll>
                  <section className="flex flex-col items-center px-4 py-24 md:py-32 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#006699] via-[#005588] to-[#004477]"></div>
                     <div className="absolute top-0 right-0 w-full h-full">
                     <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
                        <defs>
                           <linearGradient id="a" gradientTransform="rotate(90)">
                           <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                           <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                           </linearGradient>
                        </defs>
                        <path d="M0,1000 C200,800 350,700 500,600 C650,500 800,300 1000,0 L1000,1000 Z" fill="url(#a)" />
                     </svg>
                     </div>

                     <div className="container relative z-10">
                     <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                           {translate('onboarding.readyDifference')}
                        </h2>
                        <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                           {translate('onboarding.readyDifferenceDescription')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-5">
                           <Link href='#'>
                              <Button className="bg-white text-[#006699] hover:bg-white/90 px-10 py-7 text-lg rounded-full group">
                                 {translate('onboarding.applyNow')}
                                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </Button>
                           </Link>

                           <Link href='#'>
                              <Button className="bg-white text-[#006699] hover:bg-white/90 px-10 py-7 text-lg rounded-full group">
                                 {translate('onboarding.contactUs')}
                                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </Button>
                           </Link>
                        </div>
                     </div>
                     </div>
                  </section>
               </RevealOnScroll>
          </main>
         </div>
   )
}


export default OnboardingView;