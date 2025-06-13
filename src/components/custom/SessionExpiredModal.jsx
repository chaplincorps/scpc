"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, ShieldAlert, Chrome, Loader, Facebook } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { CLIENT_ENDPOINTS } from "@/config/apiEndpoints"

const formSchema = z.object({
  applicationId: z
    .string()
    .min(1, { message: "Application ID is required" })
    .regex(/^[A-Z0-9]+$/, { message: "Application ID must contain only uppercase letters and numbers" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
})

export function SessionExpiredModal({ onAuthenticate, onLogout }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      applicationId: "",
      password: "",
    },
  })

  // Watch values for validation
  const watchedApplicationId = watch("applicationId")
  const watchedPassword = watch("password")

  // Check if individual fields are valid
  const isApplicationIdValid = dirtyFields.applicationId && !errors.applicationId
  const isPasswordValid = dirtyFields.password && !errors.password

  const MAX_ATTEMPTS = 3

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      const success = await onAuthenticate(data.applicationId, data.password)

      if (!success) {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS) {
          onLogout()
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
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
        setError('Failed to initialize Google sign in')
      }
    } catch (error) {
      console.error('Google sign in error:', error)
      setError(error.response?.data?.error || 'Failed to initialize Google sign in')
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
        setError('Failed to initialize Facebook sign in')
      }
    } catch (error) {
      console.error('Facebook sign in error:', error)
      setError(error.response?.data?.error || 'Failed to initialize Facebook sign in')
      setIsFacebookLoading(false)
    }
  }

  const isFormValid = isApplicationIdValid && isPasswordValid

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="mb-4 rounded-full bg-[#006699]/10 p-3">
            <ShieldAlert className="h-8 w-8 text-[#006699]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Session Expired</h2>
          <p className="mt-1 text-gray-500">Please verify your identity to continue</p>
        </div>

        <div className="mb-4">
          <Button
            variant="outline"
            type="button"
            className="w-full p-6 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Chrome className="w-4 h-4 mr-2" />
            )}
            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </Button>
        </div>

        <div className="mb-4">
          <Button
            variant="outline"
            type="button"
            className="w-full p-6 border-[#006699] text-[#006699] hover:bg-[#006699]/70 hover:text-white"
            onClick={handleFacebookSignIn}
            disabled={isLoading || isFacebookLoading}
          >
            {isFacebookLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Facebook className="w-4 h-4 mr-2" />
            )}
            {isFacebookLoading ? "Connecting..." : "Continue with Facebook"}
          </Button>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applicationId" className="text-sm font-medium">
              Application ID
            </Label>
            <div className="relative">
              <Input
                id="applicationId"
                {...register("applicationId", {
                  setValueAs: (v) => v.toUpperCase(),
                })}
                className={cn(
                  "border-2 pl-10",
                  errors.applicationId
                    ? "border-red-300 focus-visible:ring-red-300"
                    : isApplicationIdValid
                    ? "border-[#28A745] focus-visible:ring-[#28A745]"
                    : "border-gray-200 focus-visible:border-[#006699] focus-visible:ring-[#006699]",
                )}
                placeholder="Enter your Application ID"
                autoComplete="off"
                autoCapitalize="characters"
                disabled={isLoading}
              />
              <Lock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            </div>
            {errors.applicationId && (
              <p className="text-xs text-red-500">{errors.applicationId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={cn(
                  "border-2 pl-10 pr-10",
                  errors.password
                    ? "border-red-300 focus-visible:ring-red-300"
                    : isPasswordValid
                    ? "border-[#28A745] focus-visible:ring-[#28A745]"
                    : "border-gray-200 focus-visible:border-[#006699] focus-visible:ring-[#006699]",
                )}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <Lock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-2 text-xs text-center text-gray-500">
            Attempt {attempts + 1} of {MAX_ATTEMPTS}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="bg-[#006699] hover:bg-[#005588] focus-visible:ring-[#006699]"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-[#006699] text-[#006699] hover:bg-[#006699]/10"
              onClick={onLogout}
              disabled={isLoading}
            >
              Log Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
