'use client'

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ArrowRight, Phone, Mail, MapPin, Shield, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsView(){
    const [activeSection, setActiveSection] = useState(null)
  const [lastUpdated] = useState("March 22, 2024")
  const [isLoading, setIsLoading] = useState(true)
  const sectionRefs = useRef({})

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Register section refs
  const registerSectionRef = (id, ref) => {
    sectionRefs.current[id] = ref
  }

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const sectionRef = sectionRefs.current[sectionId]
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Terms of Service data structure
  const termsData = [
    {
      id: "introduction",
      title: "1. Introduction",
      subsections: [
        {
          id: "welcome",
          title: "1.1 Welcome to SCPC",
          content: [
            "Welcome to Special Chaplain Peace Corps (SCPC)",
            "These Terms of Service govern your use of our website, products, and services",
            "Please read these terms carefully before using our services",
            "By accessing our platform, you acknowledge understanding of these terms",
            "Our mission is to provide spiritual guidance and peace-building services",
          ],
        },
      ],
    },
    {
      id: "acceptance",
      title: "2. Acceptance of Terms",
      subsections: [
        {
          id: "agreement",
          title: "2.1 User Agreement",
          content: [
            "By accessing or using our services, you agree to be bound by these Terms",
            "If you do not agree to these terms, please do not use SCPC's services",
            "Your continued use constitutes acceptance of any updates to these terms",
            "You must be at least 18 years old to use our services",
            "Legal guardians may consent for minors under applicable law",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "3. Changes to Terms",
      subsections: [
        {
          id: "modifications",
          title: "3.1 Term Modifications",
          content: [
            "SCPC may modify these Terms at any time",
            "We will notify you via email at least 72 hours before changes take effect",
            "Continued use constitutes acceptance of updated terms",
            "Major changes will be highlighted in our communications",
            "You may discontinue use if you disagree with modifications",
          ],
        },
      ],
    },
    {
      id: "user-accounts",
      title: "4. User Accounts & Access",
      subsections: [
        {
          id: "registration",
          title: "4.1 Account Registration",
          content: [
            "To access certain features (application, screening, classes), you must register",
            "You must provide accurate and complete personal information",
            "You are responsible for maintaining account security",
            "One account per person is permitted",
            "False information may result in account termination",
          ],
        },
        {
          id: "access-requirements",
          title: "4.2 Access Requirements",
          content: [
            "Valid email address required for registration",
            "Phone number verification may be required",
            "Identity verification for certain programs",
            "Compliance with screening requirements",
            "Adherence to program-specific prerequisites",
          ],
        },
      ],
    },
    {
      id: "payment-terms",
      title: "5. Payment Terms",
      subsections: [
        {
          id: "fees",
          title: "5.1 Program Fees",
          content: [
            "Application fee: ₦5,000 (one-time, non-refundable)",
            "Enlistment fee: ₦400,000 (one-time, non-refundable)",
            "All payments are processed in Nigerian Naira (₦)",
            "Payment methods: card or bank transfer",
            "Additional fees may apply for specialized programs",
          ],
        },
        {
          id: "refund-policy",
          title: "5.2 Refund Policy",
          content: [
            "All payments are final and non-refundable",
            "No refunds or cancellations after payment confirmation",
            "Exceptional circumstances will be reviewed case-by-case",
            "Payment disputes must be raised within 7 days",
            "Fraudulent payments will be investigated and reversed",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      subsections: [
        {
          id: "scpc-content",
          title: "6.1 SCPC Content",
          content: [
            "All content on this site is the property of SCPC",
            "You may not use, reproduce, or distribute without permission",
            "Trademarks and logos are protected intellectual property",
            "Course materials are licensed for personal use only",
            "Commercial use requires written authorization",
          ],
        },
        {
          id: "user-content",
          title: "6.2 User Content",
          content: [
            "Users retain ownership of personal data submitted",
            "SCPC receives license to process and store information for program purposes",
            "User-generated content may be used for testimonials with consent",
            "Privacy rights are maintained according to our Privacy Policy",
            "Data retention follows legal and operational requirements",
          ],
        },
      ],
    },
    {
      id: "disclaimers",
      title: "7. Disclaimers & Liability",
      subsections: [
        {
          id: "service-disclaimers",
          title: "7.1 Service Disclaimers",
          content: [
            "SCPC provides services 'as-is' without warranties",
            "We do not guarantee specific outcomes from our programs",
            "Service availability may be subject to interruptions",
            "Third-party integrations are not under our direct control",
            "Users participate in programs at their own discretion",
          ],
        },
        {
          id: "liability-limits",
          title: "7.2 Liability Limitations",
          content: [
            "To the maximum extent permitted by law, SCPC disclaims all warranties",
            "Liability is limited to the amount paid by you in the last 12 months",
            "We are not liable for indirect, incidental, or consequential damages",
            "Force majeure events are excluded from liability",
            "Users assume responsibility for their participation decisions",
          ],
        },
      ],
    },
    {
      id: "termination",
      title: "8. Termination",
      subsections: [
        {
          id: "account-termination",
          title: "8.1 Account Termination",
          content: [
            "We may suspend or terminate accounts for false information",
            "Fraud, non-payment, or policy violations result in termination",
            "Users may terminate their accounts at any time",
            "Termination does not affect payment obligations",
            "Appeal process available for disputed terminations",
          ],
        },
        {
          id: "data-handling",
          title: "8.2 Post-Termination Data",
          content: [
            "Upon termination, your data will be archived for record-keeping",
            "Data retention follows legal requirements",
            "Personal information handling per Privacy Policy",
            "Program completion records maintained permanently",
            "Access to services ceases immediately upon termination",
          ],
        },
      ],
    },
    {
      id: "governing-law",
      title: "9. Governing Law & Dispute Resolution",
      subsections: [
        {
          id: "applicable-law",
          title: "9.1 Governing Law",
          content: [
            "These Terms are governed by the laws of Nigeria",
            "USA laws may apply where applicable to international operations",
            "Local state laws may supplement federal regulations",
            "International participants subject to their local laws",
            "Conflicts of law resolved in favor of Nigerian jurisdiction",
          ],
        },
        {
          id: "dispute-resolution",
          title: "9.2 Dispute Resolution",
          content: [
            "Disputes may be resolved through arbitration or litigation",
            "Notice of disputes via State Command WhatsApp group or email",
            "Good faith negotiation required before formal proceedings",
            "Mediation services available for complex disputes",
            "Legal proceedings in Nigerian courts unless otherwise agreed",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "10. Contact Information",
      subsections: [
        {
          id: "support-contact",
          title: "10.1 Support Contact",
          content: [
            "For questions about these Terms, please email support@chaplincorps.org.ng",
            "Phone support available during business hours",
            "WhatsApp support through State Command groups",
            "Physical office visits by appointment only",
            "Response time: 24-48 hours for email inquiries",
          ],
        },
      ],
    },
  ]

  // Section component
  const Section = ({ section }) => {
    const [isOpen, setIsOpen] = useState(activeSection === section.id)
    const sectionRef = useRef(null)

    useEffect(() => {
      registerSectionRef(section.id, sectionRef.current)
    }, [section.id])

    useEffect(() => {
      setIsOpen(activeSection === section.id)
    }, [activeSection, section.id])

    const toggleSection = () => {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setActiveSection(section.id)
      }
    }

    return (
      <div
        ref={sectionRef}
        id={section.id}
        className="mb-8 overflow-hidden transition-shadow duration-300 bg-white shadow-sm scroll-mt-24 rounded-xl hover:shadow-md"
      >
        <button
          onClick={toggleSection}
          className={`w-full text-left transition-colors duration-200 ${
            isOpen ? "bg-blue-50" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  isOpen ? "bg-[#006699] text-white" : "bg-[#006699]/20 text-[#006699]"
                }`}
              >
                <span className="font-semibold">{section.title.split(".")[0]}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{section.title.split(".")[1]}</h2>
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
                isOpen ? "bg-[#006699]/20 text-[#006699] rotate-180" : "bg-gray-100 text-gray-500"
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="p-6 bg-white">
            {section.subsections.map((subsection) => (
              <div key={subsection.id} className="mb-8 last:mb-0" id={subsection.id}>
                <h3 className="pb-2 mb-4 text-lg font-semibold text-gray-700 border-b border-gray-100">
                  {subsection.title}
                </h3>
                <ul className="pl-5 space-y-3">
                  {subsection.content.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-[#006699]/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-[#006699] rounded-full"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

    return (
    <div className="min-h-[calc(100vh-49px)] bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#006699] text-white py-16">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Terms of Service</h1>
            <p className="mb-8 text-xl text-blue-50">
              Please read these terms carefully before using Special Chaplain Peace Corps services.
            </p>
            <Button className="h-12 px-6 bg-white text-[#006699] hover:bg-white/90 hover:text-[#006699]">
              <Link href="/Client/Registration" className="text-[#006699]">
                Create Account
              </Link>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="container max-w-[95%] px-4 mx-auto md:px-6">
          <div className="mx-auto max-w-[80%]">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Quick Reference</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699]/20 rounded-full">
                  <Shield className="h-5 w-5 text-[#006699]" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Organization</p>
                  <p className="text-gray-600">Special Chaplain Peace Corps (SCPC)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699]/20 rounded-full">
                  <Mail className="h-5 w-5 text-[#006699]" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p className="text-gray-600">support@chaplincorps.org.ng</p>
                  <p className="text-gray-600">WhatsApp Support Available</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699]/20 rounded-full">
                  <MapPin className="h-5 w-5 text-[#006699]" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Jurisdiction</p>
                  <p className="text-gray-600">Nigeria (Primary)</p>
                  <p className="text-gray-600">USA (Where Applicable)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-[90%] px-4 py-12 mx-auto md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky overflow-hidden bg-white border border-gray-100 shadow-sm top-24 rounded-xl">
              <div className="p-5 border-b border-gray-100 bg-blue-50">
                <h3 className="mb-1 font-bold text-gray-800">Table of Contents</h3>
                <p className="text-sm text-gray-600">Navigate through our terms of service</p>
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <nav>
                  <ul className="space-y-1">
                    {termsData.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            activeSection === section.id
                              ? "bg-[#006699]/20 text-[#006699] font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="p-4 border-t border-blue-100 bg-blue-50">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    By using SCPC services, you agree to these terms and conditions. For questions, please contact our
                    support team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {termsData.map((section) => (
              <Section key={section.id} section={section} />
            ))}

            {/* Legal Compliance Section */}
            <div className="p-6 mt-12 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <div className="w-10 h-10 rounded-full bg-[#006699]/20 flex items-center justify-center mr-4 text-[#006699]">
                  <Shield className="w-5 h-5" />
                </div>
                Legal Compliance
              </h2>
              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Nigerian Data Protection",
                  "Consumer Protection Laws",
                  "Religious Organization Regulations",
                  "Payment Processing Compliance",
                  "International Operations",
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50">
                    <CheckCircle2 className="h-5 w-5 text-[#006699] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 mt-8 border border-blue-100 shadow-sm bg-blue-50 rounded-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-800">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699]/20 rounded-full">
                    <Mail className="h-6 w-6 text-[#006699]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@chaplincorps.org.ng</p>
                </div>
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699]/20 rounded-full">
                    <Phone className="h-6 w-6 text-[#006699]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">State Command Groups</p>
                </div>
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699]/20 rounded-full">
                    <MapPin className="h-6 w-6 text-[#006699]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">Jurisdiction</h3>
                  <p className="text-gray-600">
                    Nigeria (Primary)
                    <br />
                    USA (International)
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptance Banner */}
            <div className="mt-12 bg-[#006699] p-6 rounded-xl shadow-md text-white">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h3 className="mb-2 text-xl font-bold">Agree to Terms</h3>
                  <p className="text-blue-50">
                    By using SCPC services, you acknowledge that you have read and agree to these Terms of Service.
                  </p>
                  <p className="mt-2 text-sm text-blue-100">Last updated: {lastUpdated}</p>
                </div>
                <Button className="bg-white rounded text-[#006699] hover:bg-gray-100 whitespace-nowrap">
                  <Link href="/Client/Login" className="text-[#006699]">
                    Back to Platform
                  </Link>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}