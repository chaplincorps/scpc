'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import axios from "axios"
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from '@/store/authStore'
import { useDashboardStore } from '@/store/dashboardStore'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const formSchema = z
  .object({
    applicationId: z
      .string()
      .min(1, { message: "Application ID is required" })
      .regex(/^[A-Z0-9]+$/, { message: "Application ID must contain only uppercase letters and numbers" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
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
         className={`!h-14 !px-3 !pt-4 !rounded !focus:ring-0 !focus:outline-none !focus:ring-offset-0 
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
         className={`absolute transform duration-200 left-3 px-1 bg-white rounded
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
 
export default function LoginLogic(){
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const [isTransitioning, setIsTransitioning] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [isApplicationIdFocused, setIsApplicationIdFocused] = useState(false)
   const [isPasswordFocused, setIsPasswordFocused] = useState(false)
   const [isGoogleLoading, setIsGoogleLoading] = useState(false)
   const [isFacebookLoading, setIsFacebookLoading] = useState(false)

   // Check for error parameters in URL
   useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search)
      const error = searchParams.get('error')
      
      if (error) {
         const errorMessages = {
            'no_code': 'Social login failed: No authorization code received',
            'signin_failed': 'Social login failed: Unable to sign in',
            'auth_failed': 'Social login failed: Authentication error',
            'id_generation_failed': 'Social login failed: Could not generate unique ID',
            'registration_failed': 'Social login failed: Registration error',
            'unexpected_error': 'An unexpected error occurred during social login'
         }

         const message = errorMessages[error] || 'Social login failed'
         toast.error(message)
         
         // Remove the error parameter from URL without refreshing the page
         const newUrl = window.location.pathname
         window.history.replaceState({}, '', newUrl)
      }
   }, [])

   const {
      register,
      handleSubmit,
      formState: { errors, dirtyFields },
      watch,
   } = useForm({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
         applicationId: "",
         password: "",
      },
   })
 
   // Watch values for floating labels
   const watchedApplicationId = watch("applicationId")
   const watchedPassword = watch("password")
   
   // Check if individual fields are valid
   const isApplicationIdValid = dirtyFields.applicationId && !errors.applicationId
   const isPasswordValid = dirtyFields.password && !errors.password

   // Check if form is ready to submit
   const isFormReadyToSubmit = isApplicationIdValid && isPasswordValid && !isLoading

   const HandleLogin = async(data) => {
      setIsLoading(true)

      // Get store actions
      const { setUser, clearUser } = useAuthStore.getState()
      const { setDashboardData, setError: setDashboardError } = useDashboardStore.getState()

      try {
         const response = await axios.post(CLIENT_ENDPOINTS.AUTH.LOGIN, {
            application_id: data.applicationId,
            password: data.password
         })
         
         if (response.status === 200) {
            // Create Supabase client - this will automatically handle cookies
            const supabase = createClientComponentClient()
            
            if (response.data.session) {
               try {
                  // Set the session from the server response
                  const { error } = await supabase.auth.setSession({
                     access_token: response.data.session.access_token,
                     refresh_token: response.data.session.refresh_token
                  })
                  
                  if (error) {
                     console.error('Session setup failed:', error)
                     toast.error('Failed to setup session')
                     return
                  }
               } catch (sessionError) {
                  toast.error('Session setup error')
                  console.error('Session setup error:', sessionError)
                  return
               }
            }
            
            // Update store with user data
            setUser(response.data.user)

            // Start transition and navigate
            setIsTransitioning(true)
            router.push('/Client/Dashboard', { 
               onSuccess: async () => {
                  // Pre-fetch dashboard data after navigation starts
                  try {
                     console.log('Pre-fetching dashboard data...')
                     const dashboardResponse = await axios.get(CLIENT_ENDPOINTS.DASHBOARD)
                     
                     // Store dashboard data in the dashboard store
                     setDashboardData(dashboardResponse.data)
                     console.log('Dashboard data pre-fetched and stored:', dashboardResponse.data)
                     toast.success('Login successful')
                  } 
                  catch (dashboardError) {
                     console.error('Dashboard pre-fetch failed:', dashboardError)
                     // Set error in dashboard store but don't block navigation
                     setDashboardError(dashboardError.response?.data?.error || 'Failed to load dashboard data')
                     toast.success('Login successful')
                  }
               }
            })
         }
      } 
      catch(error) {
         // Clear user in zustand store on login failure
         clearUser()
         if (error.response) {
            const errorMessage = error.response.data.error || error.response.data.message || "Login failed. Please try again."
            toast.error(errorMessage)
            console.error('Login error:', errorMessage)
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
    } catch (error) {
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
      HandleLogin,
      register,
      errors,
      isApplicationIdFocused,
      setIsApplicationIdFocused,
      watchedApplicationId,
      isApplicationIdValid,
      showPassword,
      setShowPassword,
      isPasswordFocused,
      setIsPasswordFocused,
      watchedPassword,
      isPasswordValid,
      isFormReadyToSubmit,
      FloatingLabelInput,
      handleSubmit,
      isLoading,
      isTransitioning,
      handleGoogleSignIn,
      isGoogleLoading,
      handleFacebookSignIn,
      isFacebookLoading
   }
}