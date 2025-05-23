'use client'

import BackgroundImage from '@images/WaterMark_Logo.png'
import { HeartHandshake, Quote, Apple, Chrome, LogIn, Loader} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoginLogic from './LoginLogic';

const LoginView = () => {
   const {HandleLogin,
      register,
      errors,
      isEmailFocused,
      setIsEmailFocused,
      watchedEmail,
      isLoading,
      isEmailValid,
      showPassword,
      setShowPassword,
      isPasswordFocused,
      setIsPasswordFocused,
      watchedPassword,
      isPasswordValid,
      isFormReadyToSubmit,
      FloatingLabelInput,
      handleSubmit} = LoginLogic()
      
   return (
      <div className="flex min-h-[calc(100vh-49px)] md:flex-row">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-[50%] bg-white flex items-center justify-center p-2">
               <Card className="w-full shadow-lg">
                  <CardHeader className="space-y-1">
                     <CardTitle className="text-2xl font-bold text-center text-[#006699]">Welcome Back</CardTitle>
                     <CardDescription className="text-center text-[#006699]">Please login below to continue</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit(HandleLogin)} className="space-y-1">
                        {/* Email Field */}
                        <div className="relative">
                           <FloatingLabelInput
                              id="email"
                              label="Email Address"
                              type="email"
                              register={register("email")}
                              errors={errors.email}
                              isFocused={isEmailFocused}
                              setIsFocused={setIsEmailFocused}
                              watchedValue={watchedEmail}
                              disabled={isLoading}
                              isValid={isEmailValid}
                           />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                           <FloatingLabelInput
                              id="password"
                              label="Password"
                              type="password"
                              register={register("password")}
                              errors={errors.password}
                              isFocused={isPasswordFocused}
                              setIsFocused={setIsPasswordFocused}
                              watchedValue={watchedPassword}
                              disabled={isLoading}
                              showToggle={true}
                              toggleState={showPassword}
                              onToggle={() => setShowPassword(!showPassword)}
                              isValid={isPasswordValid}
                           />
                        </div>
                           
                        <div className="flex justify-end text-sm">
                           <Link href="#" className="text-[#006699] hover:underline mb-3">
                              Forgot Password?
                           </Link>
                        </div>

                        <Button 
                           type="submit" 
                           className="mb-4 p-6 w-full bg-[#006699] hover:bg-[#005588] text-white cursor-pointer"
                           disabled={!isFormReadyToSubmit}
                        >
                          {isLoading ? (
                                 <div className="flex items-center gap-2">
                                    <Loader className="animate-spin" />
                                 </div>
                              ) : (
                                 <>
                                     Sign In
                                    <LogIn  className="w-4 h-4" />
                                 </>
                              )}
                        </Button>
                        
                        <div className="relative mb-6">
                           <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                           </div>
                           <div className="relative flex justify-center text-xs uppercase">
                              <span className="px-2 bg-white text-[#006699]">Or continue with</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                              <Button
                                 variant="outline"
                                 type="button"
                                 className="w-full p-6 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
                              >
                                 <Chrome className="w-4 h-4 mr-2" />
                                 Google
                              </Button>
                              <Button
                                 variant="outline"
                                 type="button"
                                 className="w-full p-6 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
                              >
                                 <Apple className="w-4 h-4 mr-2" />
                                 Apple
                              </Button>
                        </div>

                        <div className="flex items-center justify-center text-sm">
                           <p className='mr-1 text-[#006699] opacity-85'>Not yet a chaplain? {" "}</p>
                           <Link href="#" className="text-[#006699] font-bold hover:underline">
                              Application Portal
                           </Link>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>

            {/* Right Side - Branding Panel */}
            <div className="hidden md:flex md:w-[50%] bg-[#006699] relative inset-0 items-center justify-center">
               {/* Background color overlay */}
               <div 
                  className="absolute inset-0 bg-[#006699]/70 z-10"
               ></div>
               
               {/* Background image */}
               <div 
                  className="absolute inset-0 z-0"
                  style={{
                     backgroundImage: `url(${BackgroundImage.src})`,
                     backgroundSize: "contain",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                     filter: "contrast(1.1) brightness(1.2)",
                  }}
               ></div>

               {/* Content container */}
               <div className="relative z-20 flex flex-col items-center justify-between w-full h-full px-2 py-10">
                  <div className='w-[80%] text-center py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                     <h3 className='font-bold text-white' >SPECIAL CHAPLAIN PEACE CORPS</h3>   
                  </div>

                  <div className='w-[65%] flex flex-col items-center py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                     <HeartHandshake
                      className='w-10 h-10 text-white'
                     />
                       <h2 className="text-[16px] font-bold text-white text-center text-shadow-2xs mb-7">Welcome to the Special Chaplain Peace Corps Login Portal</h2>
                        <p className="text-center text-white">Access to certain services is restricted to authenticated users only.</p>
                  </div>

                  <div className='w-[80%] flex flex-col items-center py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                     <Quote 
                      className='w-3 h-3 mb-2 text-white'
                     />
                     <p className="mt-auto italic text-[15px] text-white text-center">In GOD with Service to Humanity</p>

                  </div>
               </div>
            </div>
      </div>
   )
}

export default LoginView;