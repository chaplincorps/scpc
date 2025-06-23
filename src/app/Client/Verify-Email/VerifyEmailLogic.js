'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVerifyEmailStore } from "@/store/verifyEmailStore"
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'

// Email form validation schema
const emailSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
 })
 
 const FloatingLabelInput = ({
   id,
   label,
   register,
   errors,
   type = "text",
   isFocused,
   setIsFocused,
   watchedValue,
   showToggle = false,
   toggleState = false,
   onToggle = () => {},
   isValid = false,
   ...props
 }) => {
   return (
     <div className="relative mb-6">
       <Input
         id={id}
         type={type === "password" && showToggle ? (toggleState ? "text" : "password") : type}
         {...register}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
         autoComplete={type === "password" ? "new-password" : "off"}
         className={`!h-12 !px-3 !pt-4 !rounded !focus:ring-0 !focus:outline-none !focus:ring-offset-0 
           ${
             errors
               ? "!border-red-500 !focus:border-red-500"
               : isValid
                 ? "!border-[#28A745] !focus:border-[#28A745]"
                 : "!border-[#006699] !focus:border-[#006699]"
           }`}
         {...props}
       />
       <Label
         htmlFor={id}
         className={`absolute transform duration-200 left-3 px-1 bg-white
           ${
             isFocused || watchedValue?.length > 0
               ? "-translate-y-2 top-2 text-xs z-10"
               : "top-1/2 -translate-y-1/2"
           }
           ${
             errors
               ? "text-red-500"
               : isValid
                 ? "text-[#28A745]"
                 : "text-[#006699]"
           }`}
       >
         {label}
       </Label>
 
       {type === "password" && showToggle && (
         <div
           className="absolute right-3 top-[50%] -translate-y-1/2 flex items-center justify-center"
           onClick={onToggle}
         >
           {toggleState ? (
             <EyeOff className={`w-5 h-5 cursor-pointer
               ${
                  errors
                     ? "!text-red-500"
                     : isValid
                     ? "!text-[#28A745]"
                     : "!text-[#006699]"
               }`} 
            />
           ) : (
             <Eye className={`w-5 h-5 cursor-pointer
               ${
                  errors
                     ? "!text-red-500"
                     : isValid
                     ? "!text-[#28A745]"
                     : "!text-[#006699]"
               }`} 
            />
           )}
         </div>
       )}
 
       {errors && <p className="absolute text-xs text-red-500 text-start -bottom-5">{errors.message}</p>}
     </div>
   )
 }
 
export default function VerifyEmailLogic(){
   const email = useVerifyEmailStore(s => s.email)
   const clearEmail = useVerifyEmailStore(s => s.clearEmail)
   const setEmail = useVerifyEmailStore(s => s.setEmail)
   const [isEmailLoading, setIsEmailLoading] = useState(false)
   const [isEmailVerificationTokenVerificationLoading, setIsEmailVerificationTokenVerificationLoading] = useState(false)
   const [activeTab, setActiveTab] = useState("email")
   const [verificationToken, setVerificationToken] = useState("")
   const [isEmailFocused, setIsEmailFocused] = useState(false)

  // Email form
  const {
   register: registerEmail,
   handleSubmit: handleSubmitEmail,
   formState: { errors: emailErrors, dirtyFields: emailDirtyFields },
   watch: watchEmail,
   reset: resetEmail,
 } = useForm({
   resolver: zodResolver(emailSchema),
   mode: "onChange",
   defaultValues: {
     email: "",
   },
 })

 // Watch values for floating labels
 const watchedEmail = watchEmail("email")

 // Check if individual fields are valid
 const isEmailValid = emailDirtyFields.email && !emailErrors.email

 // Check if forms are ready to submit
 const isEmailFormReadyToSubmit = isEmailValid && !isEmailLoading

  const handleSubmitEmailSubmission = async (data) => {
   setIsEmailLoading(true)
   try {
         const response = await axios.post(CLIENT_ENDPOINTS.AUTH.VERIFY_EMAIL_MANUAL, {
            email: data.email
         })
         if(response.status === 200){
            setEmail(data.email)
            resetEmail()
            setActiveTab("verification")
            toast.success(response.data.message)
         }
      }
   catch (error) {
      if (error.response) {
         toast.error(error.response.data.error || "Email collection failed");
      } else if (error.request) {
         toast.error("No response from server. Please check your connection.");
      } else {
         toast.error("An error occurred while setting up the request");
      }
   } 
   finally {
      setIsEmailLoading(false)
   }
 }
 
  const handleEmailVerificationTokenVerification = async (value) => {
   setIsEmailVerificationTokenVerificationLoading(true)
   try {
      setVerificationToken(value)
      if (value.length === 8) {
         const numericToken = Number(value)
         const response = await axios.post(CLIENT_ENDPOINTS.AUTH.VERIFY_EMAIL_MANUAL,{
            email,
            token: numericToken,
         })
         
         if(response.status === 200){
            setActiveTab("email")
            setVerificationToken("")
            clearEmail()
            toast.success(response.data.message)
         }
      }
   } 
   catch (error) {
      if (error.response) {
         toast.error(error.response.data.error || "Email failed");
      } else if (error.request) {
         toast.error("No response from server. Please check your connection.");
      } else {
         toast.error("An error occurred while setting up the request");
      }
   } 
   finally {
     setIsEmailVerificationTokenVerificationLoading(false)
   }
 }
 
  return {
      email,
      activeTab,
      setActiveTab,
      isEmailLoading,
      isEmailVerificationTokenVerificationLoading,
      isEmailFocused,
      setIsEmailFocused,
      watchedEmail,
      isEmailValid,
      isEmailFormReadyToSubmit,
      handleSubmitEmailSubmission,
      handleEmailVerificationTokenVerification,
      FloatingLabelInput,
      registerEmail,
      emailErrors,
      verificationToken,
      handleSubmitEmail,
   }
}