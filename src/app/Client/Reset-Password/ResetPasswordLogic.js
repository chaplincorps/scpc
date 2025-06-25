'use client'
import { useState} from "react"
import { useForm } from "react-hook-form"
import { 
  Eye,
  EyeOff} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePasswordResetStore } from "@/store/passwordResetStore"
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'

// Email form validation schema
const emailSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
 })

// Password form validation schema
const passwordSchema = z
   .object({
     password: z
       .string()
       .min(8, { message: "Password must be at least 8 characters" })
       .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
       .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
       .regex(/[0-9]/, { message: "Password must contain at least one number" })
       .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
     confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
     message: "Passwords do not match",
     path: ["confirmPassword"],
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
 
export default function ResetPasswordLogic(){
     const email = usePasswordResetStore(s => s.email)
     const clearEmail = usePasswordResetStore(s => s.clearEmail)
     const setEmail = usePasswordResetStore(s => s.setEmail)
     const [isEmailLoading, setIsEmailLoading] = useState(false)
     const [isEmailFocused, setIsEmailFocused] = useState(false)
     const [activeTab, setActiveTab] = useState("email")
     const [VerificationTokenLoading, setVerificationTokenLoading] = useState(false)
     const [verificationToken, setVerificationToken] = useState("")
     const [isPasswordLoading, setIsPasswordLoading] = useState(false)
     const [showPassword, setShowPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
     const [isPasswordFocused, setIsPasswordFocused] = useState(false)
     const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
     

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

      // Password form
      const {
         register: registerPassword,
         handleSubmit: handleSubmitPassword,
         formState: { errors: passwordErrors, dirtyFields: passwordDirtyFields },
         watch: watchPassword,
         reset: resetPassword,
      } = useForm({
         resolver: zodResolver(passwordSchema),
         mode: "onChange",
         defaultValues: {
         password: "",
         confirmPassword: "",
         },
      })
   
      
      // Watch values for floating labels
      const watchedEmail = watchEmail("email")
      const watchedPassword = watchPassword("password")
      const watchedConfirmPassword = watchPassword("confirmPassword")

      // Check if individual fields are valid
      const isEmailValid = emailDirtyFields.email && !emailErrors.email
      const isPasswordValid = passwordDirtyFields.password && !passwordErrors.password
      const isConfirmPasswordValid = passwordDirtyFields.confirmPassword && !passwordErrors.confirmPassword


       // Check if forms are ready to submit
      const isEmailFormReadyToSubmit = isEmailValid && !isEmailLoading
      const isPasswordFormReadyToSubmit = isPasswordValid && isConfirmPasswordValid && !isPasswordLoading

      const handleSubmitEmailSubmission = async (data) => {
         setIsEmailLoading(true)
         try {
               const response = await axios.post(CLIENT_ENDPOINTS.AUTH.PASSWORD_RESET, {
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

      const handleVerificationToken = async (value) => {
         setVerificationTokenLoading(true)
         try {
            setVerificationToken(value)
            if (value.length === 8) {
               const numericToken = value
               const response = await axios.post(CLIENT_ENDPOINTS.AUTH.PASSWORD_RESET,{
                  email,
                  token: numericToken,
               })
               
               if(response.status === 200){
                  setActiveTab("password")
                  setVerificationToken("")
                  toast.success(response.data.message)
               }
            }
         } 
         catch (error) {
            if (error.response) {
               toast.error(error.response.data.error || "Token verification failed");
            } else if (error.request) {
               toast.error("No response from server. Please check your connection.");
            } else {
               toast.error("An error occurred while setting up the request");
            }
         } 
         finally {
           setVerificationTokenLoading(false)
         }
       }

      const handleSubmitPasswordSubmission = async (data) => {
           setIsPasswordLoading(true)
            try {
               const response = await axios.post(CLIENT_ENDPOINTS.AUTH.PASSWORD_RESET,{
                  email,
                  password:data.password,
               })
               if(response.status === 200){
                  resetPassword()
                  clearEmail()
                  setActiveTab("email")
                  toast.success(response.data.message)
                  sessionStorage.removeItem('sellerEmail');
               }
            } 
            catch(error){
               if (error.response) {
                  toast.error(error.response.data.error || "Password submission failed");
               } else if (error.request) {
                  toast.error("No response from server. Please check your connection.");
               } else {
                  toast.error("An error occurred while setting up the request");
               }
            }
            finally {
                  setIsPasswordLoading(false)
            }
      }
       
  return{
   activeTab,
   setActiveTab,
   FloatingLabelInput,
   email,
   watchedEmail,
   isEmailFormReadyToSubmit,
   handleSubmitEmail,
   handleSubmitEmailSubmission,
   isEmailLoading,
   isEmailValid,
   isEmailFocused,
   setIsEmailFocused,
   registerEmail,
   emailErrors,
   handleVerificationToken,
   verificationToken,
   VerificationTokenLoading,
   isPasswordLoading,
   registerPassword,
   handleSubmitPassword,
   handleSubmitPasswordSubmission,
   watchedPassword,
   watchedConfirmPassword,
   showPassword,
   showConfirmPassword,
   isPasswordFocused,
   isConfirmPasswordFocused,
   setIsPasswordFocused,
   setIsConfirmPasswordFocused,
   isPasswordValid,
   isConfirmPasswordValid,
   isPasswordFormReadyToSubmit,
   passwordErrors,
   setShowPassword,
   setShowConfirmPassword,
  }
}