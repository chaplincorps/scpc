'use client'

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRegistrationStore } from '@/store/registrationStore'
import { useVerifyEmailStore } from '@/store/verifyEmailStore'
import { usePasswordResetStore } from '@/store/passwordResetStore'
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'

export default function useResendToken() {
   const [countdown, setCountdown] = useState(0);
   const [isResendLoading, setIsResendLoading] = useState(false)
   const [isResendDisabled, setIsResendDisabled] = useState(false);
   const registrationEmail = useRegistrationStore((state) => state.email)
   const verifyEmail = useVerifyEmailStore((state) => state.email)
   const passwordResetEmail = usePasswordResetStore((state) => state.email)
   const email = registrationEmail || verifyEmail || passwordResetEmail

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
      try {
         const response = await axios.post(CLIENT_ENDPOINTS.AUTH.RESEND_TOKEN, {
            email,
         });

         if (response.status === 200) {
            toast.success(response.data.message);
            setIsResendDisabled(true);
            setCountdown(60);
         }
      } catch (error) {
         if (error.response) {
            // Show the specific error message from the server
            const errorMessage = error.response.data.error || "Failed to resend token. Please try again."
            toast.error(errorMessage);
            console.error('Resend token error:', errorMessage);
         } else if (error.request) {
            toast.error("No response from server. Please check your connection.");
            console.error('No response received:', error.request);
         } else {
            toast.error("An error occurred while setting up the request");
            console.error('Request setup error:', error.message);
         }
      } finally {
         setIsResendLoading(false);
      }
   }

   return {
      handleResendToken,
      countdown,
      isResendDisabled,
      isResendLoading,
   }
}