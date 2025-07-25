'use client'

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Eye,
  FileText,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PolicyView() {
  const [activeSection, setActiveSection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated] = useState("June 25, 2025")
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

  // Privacy Policy data structure
  const privacyData = [
    {
      id: "interpretation-definitions",
      title: "1. Interpretation and Definitions",
      subsections: [
        {
          id: "interpretation",
          title: "1.1 Interpretation",
          content: [
            "The words of which the initial letter is capitalized have meanings defined under the following conditions.",
            "The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
          ],
        },
        {
          id: "definitions",
          title: "1.2 Definitions",
          content: [
            "Account means a unique account created for You to access our Service or parts of our Service.",
            "Affiliate means an entity that controls, is controlled by or is under common control with a party.",
            "Company (referred to as either 'the Company', 'We', 'Us' or 'Our') refers to Special Chaplain Peace Corps.",
            "Cookies are small files that are placed on Your computer, mobile device or any other device by a website.",
            "Country refers to: Nigeria",
            "Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.",
            "Personal Data is any information that relates to an identified or identifiable individual.",
            "Service refers to the Website.",
            "Service Provider means any natural or legal person who processes the data on behalf of the Company.",
            "Usage Data refers to data collected automatically, either generated by the use of the Service.",
            "Website refers to Special Chaplain Peace Corps, accessible from https://chaplincorps.org.ng/",
            "You means the individual accessing or using the Service.",
          ],
        },
      ],
    },
    {
      id: "collecting-using-data",
      title: "2. Collecting and Using Your Personal Data",
      subsections: [
        {
          id: "personal-data",
          title: "2.1 Personal Data",
          content: [
            "Email address",
            "First name and last name",
            "Phone number",
            "Address, State, Province, ZIP/Postal code, City",
            "Usage Data",
          ],
        },
        {
          id: "usage-data",
          title: "2.2 Usage Data",
          content: [
            "Usage Data is collected automatically when using the Service.",
            "May include Your Device's Internet Protocol address (IP address)",
            "Browser type and version",
            "Pages of our Service that You visit",
            "Time and date of Your visit",
            "Time spent on those pages",
            "Unique device identifiers and other diagnostic data",
            "Mobile device information when accessing via mobile",
          ],
        },
        {
          id: "tracking-cookies",
          title: "2.3 Tracking Technologies and Cookies",
          content: [
            "Necessary / Essential Cookies - Session Cookies for authentication",
            "Cookies Policy / Notice Acceptance Cookies - Persistent Cookies",
            "Functionality Cookies - Remember your preferences and login details",
            "Web Beacons for counting users and website statistics",
            "Browser Cookies for storing certain information",
          ],
        },
      ],
    },
    {
      id: "use-personal-data",
      title: "3. Use of Your Personal Data",
      content: [
        "To provide and maintain our Service, including monitoring usage",
        "To manage Your Account and registration as a user",
        "For the performance of a contract for products or services",
        "To contact You via email, telephone, SMS, or push notifications",
        "To provide news, special offers and general information",
        "To manage Your requests and attend to them",
        "For business transfers during mergers or acquisitions",
        "For data analysis, identifying usage trends, and service improvement",
      ],
    },
    {
      id: "sharing-personal-data",
      title: "4. Sharing Your Personal Data",
      content: [
        "With Service Providers to monitor and analyze service use",
        "For business transfers during company transactions",
        "With Affiliates including parent company and subsidiaries",
        "With business partners to offer certain products or services",
        "With other users when you interact in public areas",
        "With Your consent for any other purpose",
      ],
    },
    {
      id: "retention-data",
      title: "5. Retention of Your Personal Data",
      content: [
        "We retain Personal Data only as long as necessary for stated purposes",
        "We retain data to comply with legal obligations",
        "Data is kept to resolve disputes and enforce agreements",
        "Usage Data is retained for internal analysis purposes",
        "Data used for security or functionality improvement may be kept longer",
        "We are legally obligated to retain some data for longer periods",
      ],
    },
    {
      id: "transfer-data",
      title: "6. Transfer of Your Personal Data",
      content: [
        "Information is processed at Company operating offices",
        "Data may be transferred to computers outside your jurisdiction",
        "Your consent represents agreement to data transfer",
        "We ensure data is treated securely during transfer",
        "Adequate controls are in place for international transfers",
        "We comply with data protection laws during transfers",
      ],
    },
    {
      id: "delete-data",
      title: "7. Delete Your Personal Data",
      content: [
        "You have the right to delete Personal Data we've collected",
        "Our Service allows you to delete certain information",
        "You can manage personal information through account settings",
        "Contact us to request access, correction, or deletion",
        "We may retain information when legally obligated",
        "Some data may be kept for lawful business purposes",
      ],
    },
    {
      id: "disclosure-data",
      title: "8. Disclosure of Your Personal Data",
      subsections: [
        {
          id: "business-transactions",
          title: "8.1 Business Transactions",
          content: [
            "Data may be transferred during mergers or acquisitions",
            "We provide notice before data becomes subject to different policy",
            "Asset sales may involve Personal Data transfer",
          ],
        },
        {
          id: "law-enforcement",
          title: "8.2 Law Enforcement",
          content: [
            "We may disclose data if required by law",
            "Valid requests by public authorities require disclosure",
            "Court orders and government agency requests are honored",
          ],
        },
        {
          id: "legal-requirements",
          title: "8.3 Other Legal Requirements",
          content: [
            "Comply with legal obligations",
            "Protect and defend Company rights or property",
            "Prevent or investigate possible wrongdoing",
            "Protect personal safety of users or public",
            "Protect against legal liability",
          ],
        },
      ],
    },
    {
      id: "security-data",
      title: "9. Security of Your Personal Data",
      content: [
        "The security of Your Personal Data is important to Us",
        "No method of internet transmission is 100% secure",
        "We use commercially acceptable means to protect data",
        "We cannot guarantee absolute security",
        "We strive to protect your Personal Data",
        "Electronic storage methods have inherent risks",
      ],
    },
    {
      id: "childrens-privacy",
      title: "10. Children's Privacy",
      content: [
        "Our Service does not address anyone under age 13",
        "We don't knowingly collect information from children under 13",
        "Parents should contact us if their child provided Personal Data",
        "We remove information from children under 13 without parental consent",
        "Parental consent may be required in some countries",
        "We comply with children's privacy protection laws",
      ],
    },
    {
      id: "links-other-websites",
      title: "11. Links to Other Websites",
      content: [
        "Our Service may contain links to other websites not operated by Us",
        "Third party links direct you to external sites",
        "We advise reviewing Privacy Policy of every site you visit",
        "We have no control over third party sites",
        "We assume no responsibility for third party content or practices",
        "Third party privacy policies may differ from ours",
      ],
    },
    {
      id: "changes-policy",
      title: "12. Changes to this Privacy Policy",
      content: [
        "We may update Our Privacy Policy from time to time",
        "Changes are posted on this page",
        "We notify via email and/or prominent notice on Service",
        "Last updated date is updated at top of Privacy Policy",
        "You should review this Privacy Policy periodically",
        "Changes are effective when posted on this page",
      ],
    },
  ]

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
                  isOpen ? "bg-[#006699] text-white" : "bg-[#006699] text-white"
                }`}
              >
                <span className="font-semibold">{section.title.split(".")[0]}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{section.title.split(".")[1]}</h2>
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
                isOpen ? "bg-[#006699] text-white rotate-180" : "bg-[#006699] text-white"
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="p-6 bg-white">
            {section.subsections ? (
              // Render subsections if they exist
              section.subsections.map((subsection) => (
                <div key={subsection.id} className="mb-8 last:mb-0" id={subsection.id}>
                  <h3 className="pb-2 mb-4 text-lg font-semibold text-gray-700 border-b border-gray-100">
                    {subsection.title}
                  </h3>
                  <ul className="pl-5 space-y-3">
                    {subsection.content.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-[#006699] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#006699]"></div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              // Render content directly if no subsections
              <ul className="pl-5 space-y-3">
                {section.content.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-[#006699] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#006699]"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }

    return (
    <div className="min-h-[calc(100vh-49px)] bg-gray-50">
      {/* Hero Section */}
      <div className="py-16 text-white bg-[#006699]">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="mb-2 text-xl text-blue-50">How we collect, use, and protect your information</p>
            <p className="mb-8 text-[#006699]">Last updated: {lastUpdated}</p>
            <Button className="h-12 px-6 bg-white rounded text-[#006699] hover:bg-white/90">
              <Link href="/Client/Support" className="text-[#006699]">
                Contact Support
              </Link>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="container max-w-[95%] px-4 mx-auto md:px-6">
          <div className="max-w-[80%] mx-auto">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Quick Reference</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699] rounded-full">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Organization</p>
                  <p className="text-gray-600">Special Chaplain Peace Corps</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699] rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p className="text-gray-600">info@chaplincorps.org.ng</p>
                  <p className="text-gray-600">+2348038964325</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 bg-[#006699] rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Website</p>
                  <p className="text-gray-600">chaplincorps.org.ng</p>
                  <p className="text-gray-600">Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto max-w-[80%] md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky overflow-hidden bg-white border border-gray-100 shadow-sm top-24 rounded-xl">
              <div className="p-5 border-b border-gray-100 bg-blue-50">
                <h3 className="mb-1 font-bold text-gray-800">Table of Contents</h3>
                <p className="text-sm text-gray-600">Navigate through our privacy policy</p>
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <nav>
                  <ul className="space-y-1">
                    {privacyData.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            activeSection === section.id
                              ? "bg-[#006699] text-white font-medium"
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
              <div className="p-4 border-t border-[#006699] bg-blue-50">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    This policy explains how we handle your personal information. Please read it carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Introduction */}
            <div className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Introduction</h2>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of
                  Your information when You use the Service and tells You about Your privacy rights and how the law
                  protects You.
                </p>
                <p className="mb-4">
                  We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
                  collection and use of information in accordance with this Privacy Policy.
                </p>
              </div>
            </div>

            {privacyData.map((section) => (
              <Section key={section.id} section={section} />
            ))}

            {/* Data Protection Principles */}
            <div className="p-6 mt-12 bg-white border border-gray-100 shadow-sm rounded-xl">
              <h2 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <div className="flex items-center justify-center w-10 h-10 mr-4 text-white bg-[#006699] rounded-full">
                  <Shield className="w-5 h-5" />
                </div>
                Our Data Protection Principles
              </h2>
              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: <Lock className="w-5 h-5 text-[#006699]" />,
                    title: "Security First",
                    description: "We implement strong security measures to protect your data",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-[#006699]" />,
                    title: "Transparency",
                    description: "We're clear about what data we collect and how we use it",
                  },
                  {
                    icon: <CheckCircle2 className="w-5 h-5 text-[#006699]" />,
                    title: "User Control",
                    description: "You maintain control over your personal information",
                  },
                  {
                    icon: <FileText className="w-5 h-5 text-[#006699]" />,
                    title: "Minimal Collection",
                    description: "We only collect what's necessary for our services",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-[#006699]" />,
                    title: "Legal Compliance",
                    description: "We adhere to applicable data protection laws",
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-[#006699]" />,
                    title: "Responsive Support",
                    description: "We're here to address your privacy concerns",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg bg-gray-50">
                    <div className="mr-3 mt-0.5">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 mt-8 border border-[#006699] shadow-sm bg-blue-50 rounded-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-800">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699] rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">info@chaplincorps.org.ng</p>
                </div>
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699] rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+2348038964325</p>
                </div>
                <div className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-[#006699] rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800">Website</h3>
                  <p className="text-gray-600">chaplincorps.org.ng</p>
                </div>
              </div>
            </div>

            {/* Acceptance Banner */}
            <div className="p-6 mt-12 text-white shadow-md bg-[#006699] rounded-xl">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h3 className="mb-2 text-xl font-bold">Your Privacy Matters</h3>
                  <p className="text-blue-50">
                    By using our service, you acknowledge that you have read and understand this Privacy Policy.
                  </p>
                </div>
                <Button className="text-[#006699] bg-white rounded hover:bg-white/100 whitespace-nowrap">
                  <Link href="/" className="text-[#006699]">
                    Back to Website
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