'use client'

import { useState} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

const RegistrationLogic = () => {
  const email = useRegistrationStore(s => s.email)
  const setEmail = useRegistrationStore((s) => s.setEmail)
  const clearEmail = useRegistrationStore((s) => s.clearEmail)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("register")
  const [verificationToken, setVerificationToken] = useState("")
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
      setEmail(data.email)
      setActiveTab("verification")
   } 
   catch (error) {

   } 
   finally {
      setIsLoading(false)
   }
 }

 const handleVerificationToken = async (value) => {
   setIsLoading(true)
   try {
      reset()
      setActiveTab("complete")
      setVerificationToken("")
      clearEmail()   } 
   catch (error) {

   } 
   finally {
     setIsLoading(false)
   }
 }

const handleCompletion = () => {
   setRegistrationSuccess(false)
   setActiveTab("register")
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
      handleCompletion
   }
}

export default RegistrationLogic;
