'use client'

import { useState} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'
import { toast } from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useRegistrationStore } from "@/store/registrationStore"

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),

    confirmPassword: z.string(),

    termsOfService: z.boolean().refine((val) => val === true, { message: "You must agree to the terms of service" }),
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

export default function RegistrationLogic() {
  const email = useRegistrationStore(s => s.email)
  const applicationId = useRegistrationStore(s => s.applicationId)
  const setEmail = useRegistrationStore((s) => s.setEmail)
  const setApplicationId = useRegistrationStore((s) => s.setApplicationId)
  const clearEmail = useRegistrationStore((s) => s.clearEmail)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("register")
  const [verificationToken, setVerificationToken] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState(false)

  // Focus states for floating labels
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)

  const {
   register,
   handleSubmit,
   formState: { errors, dirtyFields },
   watch,
   reset,
   setValue
 } = useForm({
   resolver: zodResolver(formSchema),
   mode: "onChange",
   defaultValues: {
     email: "",
     password: "",
     confirmPassword: "",
     termsOfService: false,
   },
 })

   // Watch values for floating labels
   const watchedEmail = watch("email")
   const watchedPassword = watch("password")
   const watchedConfirmPassword = watch("confirmPassword")
   const watchedTerms = watch("termsOfService")
 
   // Check if individual fields are valid
   const isEmailValid = dirtyFields.email && !errors.email
   const isPasswordValid = dirtyFields.password && !errors.password
   const isConfirmPasswordValid = dirtyFields.confirmPassword && !errors.confirmPassword

   // Handle terms checkbox change
   const handleTermsChange = (checked) => {
     setValue("termsOfService", checked, { 
       shouldValidate: true,
       shouldDirty: true,
       shouldTouch: true
     });
   };

    // Check if form is ready to submit
  const isFormReadyToSubmit =
   isEmailValid && isPasswordValid && isConfirmPasswordValid && watchedTerms && !isLoading
   
  const handleRegistration = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(CLIENT_ENDPOINTS.AUTH.REGISTER.toLowerCase(), {
        email: data.email,
        password: data.password,
        terms_of_service: data.termsOfService
      })
        if(response.status === 201){
         setEmail(data.email)
         setApplicationId(response.data.application_id)
         reset()
         setActiveTab("verification")
         toast.success(response.data.message)
      }
    } 
    catch (error) {
      if (error.response) {
        // Show the specific error message from the server
        const errorMessage = error.response.data.error || error.response.data.message || "Registration failed. Please try again."
        toast.error(errorMessage)
        console.error('Registration error:', errorMessage)
      } else if (error.request) {
         toast.error("No response from server. Please check your connection.")
         console.error('No response received:', error.request)
      } else {
         toast.error("An error occurred while setting up the request")
         console.error('Request setup error:', error.message)
      }
    } 
    finally {
      setIsLoading(false)
    }
  }
 const handleVerificationToken = async (value) => {
   setIsLoading(true)
   try {
      setVerificationToken(value)      
      if (value.length === 8) {
         // Convert token to number before sending since database expects numeric type
         const numericToken = Number(value)
         const response = await axios.post(CLIENT_ENDPOINTS.AUTH.VERIFY_EMAIL_AUTO.toLowerCase(), {
            token: numericToken,
            email,
            application_id: applicationId
         })
         
         if (response.status === 200) {
            // Only move to next stage if verification was successful
            setActiveTab("complete")
            setVerificationToken("")
            clearEmail()
            toast.success(response.data.message)
         }
      }
   } catch (error) {
      if (error.response) {
         // Show the specific error message from the server
         const errorMessage = error.response.data.error || error.response.data.message || "Email verification failed. Please try again."
         toast.error(errorMessage)
         console.error('Email verification error:', errorMessage)
         // Clear the token input on error
         setVerificationToken("")
      } else if (error.request) {
         toast.error("No response from server. Please check your connection.")
         console.error('No response received:', error.request)
      } else {
         toast.error("An error occurred while setting up the request")
         console.error('Request setup error:', error.message)
      }
   } finally {
      setIsLoading(false)
   }
 }
 

const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(applicationId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy: ", err)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      
      // Call our API endpoint to initiate Google OAuth
      const response = await axios.post(CLIENT_ENDPOINTS.AUTH.GOOGLE)
      
      if (response.data?.url) {
        // Redirect to Google's OAuth page
        window.location.href = response.data.url
      } else {
        toast.error('Failed to initialize Google sign in')
      }
    } 
    catch (error) {
      console.error('Google sign in error:', error)
      toast.error(error.response?.data?.error || 'Failed to initialize Google sign in')
      setIsGoogleLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      setIsFacebookLoading(true)
      
      // Call our API endpoint to initiate Facebook OAuth
      const response = await axios.post(CLIENT_ENDPOINTS.AUTH.FACEBOOK)
      
      if (response.data?.url) {
        // Redirect to Facebook's OAuth page
        window.location.href = response.data.url
      } else {
        toast.error('Failed to initialize Facebook sign in')
      }
    } catch (error) {
      console.error('Facebook sign in error:', error)
      toast.error(error.response?.data?.error || 'Failed to initialize Facebook sign in')
      setIsFacebookLoading(false)
    }
  }

   return {
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
      copied,
      applicationId,
      copyToClipboard,
      handleGoogleSignIn,
      isGoogleLoading,
      handleFacebookSignIn,
      isFacebookLoading
   }
}