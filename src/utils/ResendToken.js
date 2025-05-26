'use client'

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRegistrationStore } from "@/store/registrationStore"


const ResendToken = () => {
   const [countdown, setCountdown] = useState(0);
   const [isResendLoading, setIsResendLoading] = useState(false)
   const [isResendDisabled, setIsResendDisabled] = useState(false);
   const setEmail = useRegistrationStore((s) => s.setEmail)

   useEffect(() => {
      let timer;
      if (countdown > 0) {
         timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
         }, 1000);
      } else {
         setIsResendDisabled(false);
      }
      return () => clearInterval(timer);
   }, [countdown]);
   
    const handleResendToken = async () => {
      setIsResendLoading(true)

      if (!setEmail) {
         toast.error("No email found. Please try registering again.");
         return;
      }
      try {
            setIsResendDisabled(true);
            setCountdown(60);
      }
      catch (error) {
         setIsResendDisabled(false);
         setCountdown(0);
      } 
      finally {
        setIsResendLoading(false)
      }
    }

   return{
      handleResendToken,
      countdown,
      isResendDisabled,
      isResendLoading,
   }
}
  
export default ResendToken