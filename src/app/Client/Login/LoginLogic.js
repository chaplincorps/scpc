'use-client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
             <EyeOff className="w-5 h-5 text-[#006699] cursor-pointer" />
           ) : (
             <Eye className="w-5 h-5 text-[#006699] cursor-pointer" />
           )}
         </div>
       )}
 
       {errors && <p className="absolute text-xs text-red-500 text-start -bottom-5">{errors.message}</p>}
     </div>
   )
 }
 
const LoginLogic = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [isEmailFocused, setIsEmailFocused] = useState(false)
   const [isPasswordFocused, setIsPasswordFocused] = useState(false)

const {
   register,
   handleSubmit,
   formState: { errors, dirtyFields },
   watch,
 } = useForm({
   resolver: zodResolver(formSchema),
   mode: "onChange",
   defaultValues: {
     email: "",
     password: "",
   },
 })
 
 // Watch values for floating labels
   const watchedEmail = watch("email")
   const watchedPassword = watch("password")
   
   // Check if individual fields ae valid
   const isEmailValid = dirtyFields.email && !errors.email
   const isPasswordValid = dirtyFields.password && !errors.password

    // Check if form is ready to submit
  const isFormReadyToSubmit =
   isEmailValid && isPasswordValid && !isLoading

   const HandleLogin = async(e) =>{
      try{
         setIsLoading(True)
         
      }
      catch(error){
         
      }
   }

   return{
      HandleLogin,
      register,
      errors,
      isEmailFocused,
      setIsEmailFocused,
      watchedEmail,
      isEmailValid,
      showPassword,
      setShowPassword,
      isPasswordFocused,
      setIsPasswordFocused,
      watchedPassword,
      isPasswordValid,
      isFormReadyToSubmit,
      FloatingLabelInput,
      handleSubmit
   }
}

export default LoginLogic;