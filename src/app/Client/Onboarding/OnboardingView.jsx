import Link from 'next/link'
import {ArrowRight} from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/custom/HeroCarousel"
import RevealOnScroll from "@/components/custom/RevealOnScroll"
import { useTranslation } from "@/utils/translations"


export default function OnboardingView(){
    const { translate } = useTranslation()
      
   return (
         <div className="flex flex-col overflow-hidden bg-white">
         <main className="flex-1">
            {/* Hero Carousel Section */}
            <section className="relative">
               <HeroCarousel />
            </section>

              

               {/* Application Process Section - Creative flow visualization */}
               <RevealOnScroll>
                  <section id="apply" className="relative flex flex-col items-center px-4 py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                     <div className="container relative z-10">
                        <div className="max-w-3xl mx-auto mb-20 text-center">
                           <div className="inline-flex items-center px-3 py-1 bg-[#006699]/10 rounded-full text-[#006699] text-sm font-medium mb-6">
                              {translate('onboarding.getInvolved')}
                           </div>
                           <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{translate('onboarding.joinMission')}</h2>
                           <p className="text-lg text-gray-700">
                              {translate('onboarding.joinMissionDescription')}
                           </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                           <div className="relative">
                              {/* Connection line */}
                              <div className="absolute left-16 top-20 bottom-20 w-1 bg-gradient-to-b from-[#006699] to-[#0088cc] hidden md:block"></div>

                              <div className="space-y-16">
                                 <RevealOnScroll>
                                    <div className="flex flex-col items-center gap-8 md:flex-row">
                                    <div className="relative">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step1')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60"></div>
                                    </div>
                                    <div className="flex-1 p-8 bg-white border border-gray-100 shadow-lg md:ml-8 rounded-3xl">
                                       <h4 className="mb-4 text-2xl font-semibold text-gray-900">{translate('onboarding.createAccount')}</h4>
                                       <p className="leading-relaxed text-gray-600">
                                       {translate('onboarding.createAccountDescription')}
                                       </p>
                                    </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col items-center gap-8 md:flex-row md:ml-16">
                                    <div className="relative order-1 md:order-2">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step2')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-300"></div>
                                    </div>
                                    <div className="flex-1 order-2 p-8 bg-white border border-gray-100 shadow-lg md:mr-8 rounded-3xl md:order-1">
                                       <h4 className="mb-4 text-2xl font-semibold text-gray-900">{translate('onboarding.purchaseForm')}</h4>
                                       <p className="leading-relaxed text-gray-600">
                                       {translate('onboarding.purchaseFormDescription')}
                                       </p>
                                    </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col items-center gap-8 md:flex-row">
                                          <div className="relative">
                                             <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                             <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                                {translate('onboarding.step3')}
                                             </div>
                                             </div>
                                             <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-600"></div>
                                          </div>
                                          <div className="flex-1 p-8 bg-white border border-gray-100 shadow-lg md:ml-8 rounded-3xl">
                                             <h4 className="mb-4 text-2xl font-semibold text-gray-900">{translate('onboarding.takeAssessment')}</h4>
                                             <p className="leading-relaxed text-gray-600">
                                             {translate('onboarding.takeAssessmentDescription')}
                                             </p>
                                          </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col items-center gap-8 md:flex-row md:ml-16">
                                    <div className="relative order-1 md:order-2">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                       <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                          {translate('onboarding.step4')}
                                       </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-900"></div>
                                    </div>
                                    <div className="flex-1 order-2 p-8 bg-white border border-gray-100 shadow-lg md:mr-8 rounded-3xl md:order-1">
                                       <h4 className="mb-4 text-2xl font-semibold text-gray-900">{translate('onboarding.receiveRole')}</h4>
                                       <p className="leading-relaxed text-gray-600">
                                       {translate('onboarding.receiveRoleDescription')}
                                    </p>
                                 </div>
                                    </div>
                                 </RevealOnScroll>

                                 <RevealOnScroll>
                                    <div className="flex flex-col items-center gap-8 md:flex-row">
                                    <div className="relative">
                                       <div className="w-32 h-32 rounded-full bg-[#006699]/10 flex items-center justify-center z-10 relative">
                                          <div className="w-24 h-24 rounded-full bg-[#006699] text-white flex items-center justify-center text-4xl font-bold">
                                           {translate('onboarding.step5')}
                                          </div>
                                       </div>
                                       <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#006699]/5 animate-ping-slow opacity-60 delay-1200"></div>
                                    </div>
                                    <div className="flex-1 p-8 bg-white border border-gray-100 shadow-lg md:ml-8 rounded-3xl">
                                       <h4 className="mb-4 text-2xl font-semibold text-gray-900">{translate('onboarding.accessPortal')}</h4>
                                       <p className="leading-relaxed text-gray-600">
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
                  <section className="relative flex flex-col items-center px-4 py-24 overflow-hidden md:py-32">
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
                        <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                           {translate('onboarding.readyDifference')}
                        </h2>
                        <p className="mb-12 text-xl leading-relaxed md:text-2xl text-white/90">
                           {translate('onboarding.readyDifferenceDescription')}
                        </p>

                        <div className="flex flex-col justify-center gap-6 mt-5 sm:flex-row">
                           <Link href='#'>
                              <Button className="bg-white text-[#006699] hover:bg-white/90 px-10 py-7 text-lg rounded-full group">
                                 {translate('onboarding.applyNow')}
                                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                              </Button>
                           </Link>

                           <Link href='#'>
                              <Button className="bg-white text-[#006699] hover:bg-white/90 px-10 py-7 text-lg rounded-full group">
                                 {translate('onboarding.contactUs')}
                                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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