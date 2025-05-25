'use client'

import BackgroundImage from '@images/WaterMark_Logo.png'
import { HeartHandshake, Quote, Apple, Chrome, Loader, ArrowRightIcon, MailCheck, Mail, Shield, KeyRound} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {  Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import RegistrationLogic from './RegistrationLogic';
import ResendToken from '@/utils/ResendToken';

const RegistrationView = () => {
   const{
      email,
      activeTab,
      setActiveTab,
      handleSubmit,
      handleRegistration,
      register,
      errors,
      isEmailFocused,
      setIsEmailFocused,
      watchedEmail,
      isEmailValid,
      isLoading,
      showPassword,
      setShowPassword,
      showConfirmPassword,
      setShowConfirmPassword,
      isPasswordFocused,
      setIsPasswordFocused,
      watchedPassword,
      isPasswordValid,
      isConfirmPasswordFocused,
      setIsConfirmPasswordFocused,
      watchedConfirmPassword,
      isConfirmPasswordValid,
      isFormReadyToSubmit,
      FloatingLabelInput,
      handleTermsChange,
      watchedTerms,
      verificationToken,
      setVerificationToken,
      handleVerificationToken,
      handleCompletion
   } = RegistrationLogic()

   const{
      handleResendToken,
      countdown,
      isResendDisabled,
      isResendLoading,
   } = ResendToken()
   
   return(
            <div className="flex min-h-[calc(100vh-49px)] lg:flex-row">
                {/* Left Side - Login Form */}
               <div className="w-full lg:w-[50%] bg-white flex items-center justify-center p-2">
                  <Card className="w-full p-2">
                     <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-[#006699] mb-[-5px]">Create Your Account</CardTitle>
                        <CardDescription className="text-center text-[#006699] mb-[-20px]">Register below to join us</CardDescription>
                     </CardHeader>

                     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full h-10 grid-cols-3 justify-between rounded bg-[#006699]/60 -mb-5">
                           <TabsTrigger
                              value="register"
                              disabled={activeTab !== "register"}
                              className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                           >
                              Register
                           </TabsTrigger>
                           
                           <TabsTrigger
                              value="verification"
                              disabled={activeTab !== "verification"}
                              className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                           >
                            Verify
                           </TabsTrigger>
                           
                           <TabsTrigger
                              value="complete"
                              disabled={activeTab !== "complete"}
                              className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                           >
                              Complete
                           </TabsTrigger>
                        </TabsList>

                        <TabsContent value="register" className="m-0">
                           <CardContent className="px-6 py-2 lg:px-3 lg:py-6">
                              <div className="p-4 mt-4 lg:mt-0 mb-3 border border-[#006699]/10 rounded-md bg-[#006699]/5">
                                 <p className="flex items-start gap-2 text-sm text-[#006699]">
                                    <span className="bg-[#006699]/90 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                       1
                                    </span>
                                    <span>
                                       <strong>Step 1 of 3:</strong> Enter your email and password to sign up, we’ll email you a verification token...
                                    </span>
                                 </p>
                              </div>

                              <form onSubmit={handleSubmit(handleRegistration)} className="space-y-1">
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

                                 {/* Confirm Password Field */}
                                 <div className="relative">
                                    <FloatingLabelInput
                                       id="confirmPassword"
                                       label="Confirm Password"
                                       type="password"
                                       register={register("confirmPassword")}
                                       errors={errors.confirmPassword}
                                       isFocused={isConfirmPasswordFocused}
                                       setIsFocused={setIsConfirmPasswordFocused}
                                       watchedValue={watchedConfirmPassword}
                                       disabled={isLoading}
                                       showToggle={true}
                                       toggleState={showConfirmPassword}
                                       onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                       isValid={isConfirmPasswordValid}
                                    />
                                 </div>

                                 {/* Terms and Conditions Checkbox */}
                                 <div className="flex mb-3 space-x-2 items-top">
                                    <Checkbox
                                       id="termsOfService"
                                       checked={watchedTerms}
                                       onCheckedChange={handleTermsChange}
                                       disabled={isLoading}
                                       className="data-[state=checked]:bg-[#006699] data-[state=checked]:border-[#fff]"
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                    <label
                                       htmlFor="terms1"
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#006699] cursor-pointer"
                                       onClick={handleTermsChange}
                                    >
                                       Accept terms and conditions
                                    </label>
                                    <p className="text-sm text-[#006699]/85">
                                       You agree to our Terms of Service and Privacy Policy.
                                    </p>
                                    </div>
                                 </div>

                                 <Button
                                    type="submit"
                                    className="flex items-center justify-center w-full h-12 gap-2 text-white transition-all duration-200 shadow-md bg-[#006699] hover:bg-[#006699]/90 hover:shadow-lg mb-3 cursor-pointer"
                                    disabled={!isFormReadyToSubmit}
                                    >
                                    {isLoading ? (
                                       <div className="flex items-center gap-2">
                                          <Loader className="animate-spin" />
                                       </div>
                                    ) : (
                                       <>
                                          Register
                                          <ArrowRightIcon className="w-4 h-4" />
                                       </>
                                    )}
                                 </Button>

                                    <div className="relative mb-2">
                                       <div className="absolute inset-0 flex items-center">
                                          <span className="w-full border-t" />
                                       </div>
                                       <div className="relative flex justify-center text-xs uppercase">
                                          <span className="px-2 bg-white text-[#006699]">Or continue with</span>
                                       </div>
                                    </div>
            
                                    <div className="grid grid-cols-2 gap-4 mb-1">
                                          <Button
                                             variant="outline"
                                             type="button"
                                             className="w-full p-5 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
                                          >
                                             <Chrome className="w-4 h-4 mr-2" />
                                             Google
                                          </Button>
                                          <Button
                                             variant="outline"
                                             type="button"
                                             className="w-full p-5 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
                                          >
                                             <Apple className="w-4 h-4 mr-2" />
                                             Apple
                                          </Button>
                                    </div>
                              </form>


                           </CardContent>
                           
                           <CardFooter className="flex justify-center pt-2 border-t bg-gray-50">
                              <div className="flex items-center justify-center text-sm">
                                 <p className='mr-1 text-[#006699] opacity-85'>Already have an account?</p>
                                 <Link href="/Client/Login" className="font-medium text-[#006699] hover:underline">LogIn</Link>
                              </div>
                           </CardFooter>
                        </TabsContent>

                        <TabsContent value="verification" className="m-0">
                           <CardContent className="p-6 lg:p-8">
                              <div className="p-4 mt-4 lg:mt-0 mb-3 border border-[#006699]/10 rounded-md bg-[#006699]/5">
                                 <p className="flex items-start gap-2 text-sm text-[#006699] w-full">
                                    <span className="bg-[#006699]/90 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                       2
                                    </span>
                                    <span className="flex-1">
                                       <strong>Step 2 of 3:</strong> Enter the 8-digit verification token sent to{" "}
                                       <b className="font-medium">{email || "your email"}</b>. This verifies your account and completes the registration process.
                                    </span>
                                 </p>
                              </div>

                              <form onSubmit={handleVerificationToken} className="space-y-6">
                                 <div className="space-y-4">
                                    <div className="flex justify-center">
                                       <InputOTP maxLength={8} value={verificationToken} onChange={handleVerificationToken}
                                       >
                                          <InputOTPGroup>
                                             <InputOTPSlot
                                                index={0}
                                                className="w-10 h-10 border-[#006699]"
                                             />
                                             <InputOTPSlot
                                                index={1}
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={2}
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={3}
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={4}  
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={5}
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={6}
                                                className="w-10 h-10 border-[#006699]"/>
                                             <InputOTPSlot
                                                index={7}
                                                className="w-10 h-10 border-[#006699]"/>
                                          </InputOTPGroup>
                                       </InputOTP>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-2 mt-2">
                                       <div className="flex flex-col items-center justify-center gap-1 mt-2 md:flex-row">
                                          <p className="text-sm text-center text-gray-500">Didn't receive a verification token?</p>
                                          <button 
                                             type="button" 
                                             onClick={handleResendToken}
                                             disabled={isResendDisabled}
                                             className={`w-fit text-[#006699]/90 bg-transparent border-none hover:underline font-normal text-sm mt-0 ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          >
                                             {isResendLoading ? (
                                                <div className="flex items-center gap-2">
                                                   <Loader className="w-4 h-4 animate-spin" />
                                                </div>
                                             ) : (
                                                <span>Resend verification token</span>
                                             )}
                                          </button>
                                       </div>
                                       {countdown > 0 && (
                                          <span className="block text-xs text-gray-500">
                                             You can resend verification token again in {countdown} seconds
                                          </span>
                                       )}
                                    </div>
                                 </div>
                              </form>
                           </CardContent>
                            <CardFooter className="flex justify-center pt-2 border-t bg-gray-50">
                              <div className="flex items-center justify-center text-sm">
                                 <p className='mr-1 text-[#006699] opacity-85'>Back To Registration?</p>
                                 <p className="font-medium text-[#006699] cursor-pointer" 
                                  onClick={() => setActiveTab("register")}
                                 >
                                    Register
                                 </p>
                              </div>
                           </CardFooter>
                        </TabsContent>
                     </Tabs>

                  </Card>

               </div>
               
               {/* Right Side - Branding Panel */}
               <div className="hidden lg:flex lg:w-[50%] bg-[#006699] relative inset-0 items-center justify-center">
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
                        <h2 className="text-[16px] font-bold text-white text-center text-shadow-2xs mb-7">Welcome to the Special Chaplain Peace Corps Registration Portal</h2>
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

export default RegistrationView;