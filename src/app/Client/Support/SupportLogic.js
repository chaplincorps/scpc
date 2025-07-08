"use client"

import { useState, useRef, useEffect } from "react"
import { BookOpen, Heart, Calendar, Users, DollarSign, Award, Shield } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject cannot exceed 100 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
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
 
const FloatingLabelTextArea = ({
  id,
  label,
  register,
  errors,
  type = "textarea",
  isFocused,
  setIsFocused,
  watchedValue,
  isValid = false,
  ...props
}) => {
  return (
    <div className="relative mb-6">
      <Textarea
        id={id}
        {...register}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`h-32 px-3 pt-4 rounded focus:ring-0 focus:outline-none focus:ring-offset-0 
          ${
            errors
              ? "border-red-500 focus:border-red-500"
              : isValid
                ? "border-[#006699] focus:border-[#006699]"
                : "border-gray-300 focus:border-[#006699]"
          }`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute transform duration-200 left-3 px-1 bg-white pointer-events-none
          ${isFocused || watchedValue?.length > 0 ? "-translate-y-2 top-1.5 text-xs z-10" : "top-4"}
          ${errors ? "text-red-500" : isValid ? "text-[#006699]" : "text-gray-500"}`}
      >
        {label}
      </label>

      {errors && <p className="absolute text-xs text-red-500 text-start -bottom-5">{errors.message}</p>}
    </div>
  )
}
export default function SupportLogic(){
  const [activeCategory, setActiveCategory] = useState("about-us")
  const [activeFaq, setActiveFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [initialArticle, setInitialArticle] = useState(null)
  const [isNameFocused, setIsNameFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isSubjectFocused, setIsSubjectFocused] = useState(false)
  const [isMessageFocused, setIsMessageFocused] = useState(false)
  const [tawkLoaded, setTawkLoaded] = useState(false)
  const [showCommunityPop, setShowCommunityPop] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactFormRef = useRef(null)

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Watch values for floating labels
  const watchedName = watch("name")
  const watchedEmail = watch("email")
  const watchedSubject = watch("subject")
  const watchedMessage = watch("message")

  // Check if individual fields are valid
  const isNameValid = dirtyFields.name && !errors.name
  const isEmailValid = dirtyFields.email && !errors.email
  const isSubjectValid = dirtyFields.subject && !errors.subject
  const isMessageValid = dirtyFields.message && !errors.message

  // Check if form is ready to submit
  const isFormReadyToSubmit = isNameValid && isEmailValid && isSubjectValid && isMessageValid

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      const response = await axios.post(CLIENT_ENDPOINTS.SUPPORT.OFFLINE_SUPPORT, data)
      if(response.status === 201){
         toast.success(response.data.message)
         reset()
      }
    } 
    catch (error) {
      if (error.response) {
         toast.error(error.response.data.error || "Messaage submission failed");
      } 
      else if (error.request) {
         toast.error("No response from server. Please check your connection.");
      } 
      else {
         toast.error("An error occurred while setting up the request");
      }
    } 
    finally {
      setIsSubmitting(false)
    }
  }

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id)
  }

  // Support categories for Chaplin Corps
  const categories = [
    {
      id: "about-us",
      name: "About Chaplin Corps",
      icon: <Heart className="w-5 h-5" />,
      description: "Learn about our mission, vision, and community impact.",
    },
    {
      id: "services",
      name: "Our Services",
      icon: <Users className="w-5 h-5" />,
      description: "Discover the various services we offer to our community.",
    },
    {
      id: "programs",
      name: "Programs & Events",
      icon: <Calendar className="w-5 h-5" />,
      description: "Information about our ongoing programs and upcoming events.",
    },
    {
      id: "volunteer",
      name: "Volunteering",
      icon: <Award className="w-5 h-5" />,
      description: "How to get involved and volunteer with Chaplin Corps.",
    },
    {
      id: "donations",
      name: "Donations & Support",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Ways to support our mission through donations and partnerships.",
    },
    {
      id: "resources",
      name: "Resources",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Helpful resources and educational materials.",
    },
    {
      id: "privacy",
      name: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      description: "Information about data protection and privacy policies.",
    },
  ]

  // FAQ data for Chaplin Corps
  const faqData = {
    "about-us": [
      {
        id: "about-1",
        question: "What is Chaplin Corps and what do you do?",
        answer:
          "Chaplin Corps is a community-focused organization dedicated to providing spiritual guidance, support services, and community outreach programs. We serve individuals and families in need through various initiatives including counseling, emergency assistance, and educational programs.",
      },
      {
        id: "about-2",
        question: "When was Chaplin Corps founded?",
        answer:
          "Chaplin Corps was founded with the mission to serve our community through compassionate care and spiritual guidance. We have been actively serving the Nigerian community, focusing on holistic support for individuals and families.",
      },
      {
        id: "about-3",
        question: "What is your mission and vision?",
        answer:
          "Our mission is to provide comprehensive support services that address the spiritual, emotional, and practical needs of our community. Our vision is to create a stronger, more connected community where everyone has access to the support and resources they need to thrive.",
      },
      {
        id: "about-4",
        question: "How can I learn more about your leadership team?",
        answer:
          "You can learn more about our leadership team by visiting our website at chaplincorps.org.ng or contacting us directly. We're always happy to share information about our dedicated team members and their backgrounds.",
      },
    ],
    services: [
      {
        id: "serv-1",
        question: "What services does Chaplin Corps offer?",
        answer:
          "We offer a wide range of services including spiritual counseling, community outreach programs, emergency assistance, educational workshops, family support services, and crisis intervention. Our services are designed to address both immediate needs and long-term community development.",
      },
      {
        id: "serv-2",
        question: "Are your services free of charge?",
        answer:
          "Many of our core services are provided free of charge to ensure accessibility for all community members. Some specialized programs may have nominal fees to cover materials or resources, but we never turn anyone away due to inability to pay.",
      },
      {
        id: "serv-3",
        question: "How do I access your services?",
        answer:
          "You can access our services by contacting us directly through phone, email, or by visiting our office. We also have walk-in hours for urgent needs. Our team will assess your situation and connect you with the most appropriate services.",
      },
    ],
    programs: [
      {
        id: "prog-1",
        question: "What programs do you currently offer?",
        answer:
          "We offer various programs including youth development initiatives, family counseling sessions, community education workshops, emergency relief programs, and spiritual development courses. Our programs are regularly updated based on community needs.",
      },
      {
        id: "prog-2",
        question: "How can I participate in your programs?",
        answer:
          "To participate in our programs, you can register through our website, call our office, or attend one of our information sessions. Some programs have specific eligibility requirements, while others are open to all community members.",
      },
      {
        id: "prog-3",
        question: "Do you have programs for children and youth?",
        answer:
          "Yes, we have several programs specifically designed for children and youth, including mentorship programs, educational support, recreational activities, and leadership development initiatives. These programs focus on character building and skill development.",
      },
    ],
    volunteer: [
      {
        id: "vol-1",
        question: "How can I volunteer with Chaplin Corps?",
        answer:
          "We welcome volunteers who share our commitment to community service. You can apply to volunteer by filling out our volunteer application form, attending an orientation session, and completing any required background checks. We have opportunities for various skill levels and time commitments.",
      },
      {
        id: "vol-2",
        question: "What volunteer opportunities are available?",
        answer:
          "Volunteer opportunities include program assistance, administrative support, event coordination, counseling support (for qualified individuals), community outreach, fundraising activities, and special project assistance. We match volunteers with opportunities that align with their skills and interests.",
      },
      {
        id: "vol-3",
        question: "Is there training provided for volunteers?",
        answer:
          "Yes, we provide comprehensive training for all volunteers. This includes orientation about our organization, specific training for your volunteer role, ongoing support, and opportunities for skill development. We believe in equipping our volunteers for success.",
      },
    ],
    donations: [
      {
        id: "don-1",
        question: "How can I make a donation to Chaplin Corps?",
        answer:
          "You can make donations through our website, by bank transfer, or by visiting our office in person. We accept monetary donations, in-kind donations of goods and services, and planned giving options. All donations are used directly to support our community programs.",
      },
      {
        id: "don-2",
        question: "Are donations tax-deductible?",
        answer:
          "Yes, Chaplin Corps is a registered non-profit organization, and donations are tax-deductible according to Nigerian tax laws. We provide receipts for all donations for your tax records.",
      },
      {
        id: "don-3",
        question: "What items do you accept as in-kind donations?",
        answer:
          "We accept various in-kind donations including clothing, food items, educational materials, office supplies, and household goods. Please contact us before bringing large donations to ensure we can accommodate them and that they meet current needs.",
      },
    ],
    resources: [
      {
        id: "res-1",
        question: "What educational resources do you provide?",
        answer:
          "We provide educational resources including workshops on life skills, financial literacy, parenting, health and wellness, spiritual development, and career guidance. We also maintain a library of books and materials available for community use.",
      },
      {
        id: "res-2",
        question: "Do you offer counseling services?",
        answer:
          "Yes, we offer counseling services provided by trained counselors and chaplains. This includes individual counseling, family counseling, grief support, and crisis intervention. All counseling services are confidential and provided in a supportive environment.",
      },
    ],
    privacy: [
      {
        id: "priv-1",
        question: "How do you protect personal information?",
        answer:
          "We take privacy seriously and follow strict confidentiality protocols. Personal information is only collected when necessary for service delivery and is stored securely. We never share personal information without explicit consent, except as required by law.",
      },
      {
        id: "priv-2",
        question: "What is your data retention policy?",
        answer:
          "We retain personal data only as long as necessary to provide services and meet legal requirements. We have established procedures for secure data disposal and regularly review our data retention practices to ensure compliance with privacy regulations.",
      },
    ],
  }

  // Filter FAQs based on search query
  const filteredFaqs =
    searchQuery.trim() === ""
      ? faqData[activeCategory]
      : Object.values(faqData)
          .flat()
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )

  // Support articles for Chaplin Corps
  const supportArticles = [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      title: "Getting Started with Our Services",
      description: "Learn how to access and make the most of Chaplin Corps services.",
      category: "Guide",
      readTime: "5 min read",
    },
    {
      id: "b2c3d4e5-f6a1-8901-bcde-fa2345678901",
      title: "Volunteer Handbook",
      description: "Everything you need to know about volunteering with us.",
      category: "Volunteer",
      readTime: "8 min read",
    },
    {
      id: "c3d4e5f6-a1b2-9012-cdef-ab3456789012",
      title: "Community Resources Directory",
      description: "A comprehensive list of community resources and contacts.",
      category: "Resources",
      readTime: "3 min read",
    },
    {
      id: "d4e5f6a1-b2c3-0123-defa-bc4567890123",
      title: "Emergency Assistance Guide",
      description: "How to access emergency support when you need it most.",
      category: "Emergency",
      readTime: "4 min read",
    },
    {
      id: "e5f6a1b2-c3d4-1234-efab-cd5678901234",
      title: "Donation Impact Report",
      description: "See how your donations are making a difference in our community.",
      category: "Impact",
      readTime: "6 min read",
    },
    {
      id: "f6a1b2c3-d4e5-2345-fabc-de6789012345",
      title: "Privacy and Confidentiality",
      description: "Understanding our commitment to protecting your privacy.",
      category: "Policy",
      readTime: "3 min read",
    },
  ]

   useEffect(() => {
    if (typeof window === "undefined") return

    // Prepare API hooks before script loads
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Hide the widget as soon as it's ready
    window.Tawk_API.onLoad = function () {
      window.Tawk_API.hideWidget()
      setTawkLoaded(true)
    }

    // Inject the script (only once)
    if (!document.querySelector('script[src*="embed.tawk.to"]')) {
      const script = document.createElement("script")
      script.src = "https://embed.tawk.to/686cc56afa28d91913f79d50/1ivke6are"
      script.async = true
      script.charset = "UTF-8"
      script.setAttribute("crossorigin", "*")
      document.body.appendChild(script)
    }
  }, [])
  
  const openChat = () => {
    if (tawkLoaded && window.Tawk_API) {
      // maximize() opens the chat; minimize() closes it
      window.Tawk_API.maximize()
    } else {
      console.warn("Tawk.to not ready yet")
    }
  }

  return {
    activeCategory,
    setActiveCategory,
    activeFaq,
    searchQuery,
    setSearchQuery,
    handleFormSubmit,
    handleSubmit,
    isSubmitting,
    contactFormRef,
    categories,
    filteredFaqs,
    supportArticles,
    toggleFaq,
    scrollToContactForm,
    register,
    errors,
    FloatingLabelInput,
    FloatingLabelTextArea,
    isNameValid,
    isEmailValid,
    isSubjectValid,
    isMessageValid,
    isFormReadyToSubmit,
    watchedName,
    watchedEmail,
    watchedSubject,
    watchedMessage,
    isNameFocused,
    setIsNameFocused,
    isEmailFocused,
    setIsEmailFocused,
    isSubjectFocused,
    setIsSubjectFocused,
    isMessageFocused,
    setIsMessageFocused,
    openChat,
    setArticleModalOpen,
    articleModalOpen,
    initialArticle, 
    setInitialArticle,
    showCommunityPop, 
    setShowCommunityPop,
  }
}
