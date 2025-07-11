"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Music,
  Users,
  Stethoscope,
  Scale,
  DotIcon as Dove,
  AlertTriangle,
  CheckCircle,
  Target,
  ChevronDown,
  ChevronUp,
  FileX,
} from "lucide-react"
import Image from "next/image"
import Ethics from "@images/Chaplain_Ethics_and_values.png"
import Humanitarian from "@images/Chaplain_Humanitarian.png"
import Medical from "@images/Chaplain_Medical.png"
import MusicCorps from "@images/Chaplain_Music_Corps.png"
import Police from "@images/Chaplain_Police.png"
import PeaceBuilding from "@images/Chaplain_Peace_Building.png"      


export default function DepartmentView(){
  const [expandedDepartment, setExpandedDepartment] = useState(null)

   const departments = [
    {
      id: "medical",
      name: "Medical Corps",
      image: Medical,
      icon: Stethoscope,
      description: "Providing comprehensive medical and humanitarian healthcare services",
      hasContent: true,
    },
    {
      id: "humanitarian",
      name: "Humanitarian Services",
      image: Humanitarian,
      icon: Heart,
      description: "Delivering aid and support to communities in need worldwide",
      hasContent: false,
    },
    {
      id: "ethics",
      name: "Ethics & Values",
      image: Ethics,
      icon: Scale,
      description: "Upholding moral standards and ethical conduct across all operations",
      hasContent: false,
    },
    {
      id: "music",
      name: "Music Corps",
      image: MusicCorps,
      icon: Music,
      description: "Inspiring and uplifting communities through musical ministry",
      hasContent: false,
    },
    {
      id: "police",
      name: "Chaplain Police",
      image: Police,
      icon: Shield,
      description: "Maintaining order and security within chaplain operations",
      hasContent: false,
    },
    {
      id: "peace",
      name: "Peace Building",
      image: PeaceBuilding,
      icon: Dove,
      description: "Fostering reconciliation and peaceful resolution of conflicts",
      hasContent: false,
    },
  ]

  const medicalResponsibilities = [
    {
      title: "Public Healthcare Training",
      description:
        "Ensure all Chaplains in SCPC are tutored in Public Healthcare (PHC), First Aid administration, and emergency response including fire, accidents, civil unrest, evacuation assistance, and bullet wound treatment.",
      icon: AlertTriangle,
    },
    {
      title: "Humanitarian Medical Support",
      description:
        "Assist Humanitarian Units in any medical humanitarian situation requiring specialized medical intervention.",
      icon: Heart,
    },
    {
      title: "Medical Case Management",
      description:
        "Investigate, plan, transport, and refer medical humanitarian cases where patients are genuinely handicapped in getting help for their conditions.",
      icon: Target,
    },
    {
      title: "Records & Statistics",
      description:
        "Maintain comprehensive medical records and statistical data for all medical interventions and cases.",
      icon: CheckCircle,
    },
    {
      title: "Partnership & Collaboration",
      description:
        "Work with local and international organizations, NGOs, and government institutions to achieve UN SDG Goals and other world humanitarian objectives.",
      icon: Users,
    },
    {
      title: "Confidentiality & Discipline",
      description:
        "Ensure discipline and discretion in handling individual and public medical information that has not been cleared for public knowledge.",
      icon: Shield,
    },
    {
      title: "Inter-Agency Support",
      description:
        "Assist other security organizations and medical organizations in situations where help may be needed.",
      icon: Users,
    },
    {
      title: "Officer Medical Support",
      description:
        "Assist officers and men of the SCPC on medical issues in any part or place they may find themselves.",
      icon: Stethoscope,
    },
  ]

  const toggleDepartment = (departmentId) => {
    setExpandedDepartment(expandedDepartment === departmentId ? null : departmentId)
  }

  const renderDepartmentContent = (departmentId) => {
    if (departmentId === "medical") {
      return (
        <div className="space-y-8">
          {/* Welcome Message */}
          <div className="bg-[#006699]/5 p-6 rounded-lg border-l-4 border-[#006699]">
            <h3 className="text-xl font-semibold mb-4 text-[#006699]">Welcome Message</h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              Morning Officers of the Medical Corps! I want to formally welcome you all to your Units. Let me use this
              medium to charge the National Head of Medical (NHOM) in SCPC,{" "}
              <strong>Lt Col Godswill Obioma Onwumere</strong>, who has been given this huge responsibility to run and
              handle this unit of our Chaplain Organization.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              This Department is a very integral part of SCPC and as such, high level Medical Ethics and Discipline must
              be held in high value. The Medical Corps Unit falls under one of our core values of{" "}
              <strong>Humanitarian Services</strong>, which is a company headed by a Deputy Commandant General Chaplain.
            </p>
            <p className="leading-relaxed text-gray-700">
              All reports are to be forwarded through the NHOM to that office of the DCGC Humanitarian.
            </p>
          </div>

          {/* Leadership */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-black">Department Leadership</h3>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#006699] rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#006699]">Lt Col Godswill Obioma Onwumere</h4>
                  <p className="text-gray-600">National Head of Medical (NHOM)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Responsibilities */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-black">Core Responsibilities</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {medicalResponsibilities.map((responsibility, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#006699]">
                  <div className="flex items-start gap-3 mb-3">
                    <responsibility.icon className="w-6 h-6 text-[#006699] flex-shrink-0 mt-1" />
                    <h4 className="font-semibold text-black">{responsibility.title}</h4>
                  </div>
                  <p className="leading-relaxed text-gray-700">{responsibility.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-[#006699]/10 to-[#006699]/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-[#006699]">Our Mission</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              SCPC should work towards being a lead factor in terms of Medical Humanitarian coverage, working to share
              the spotlight with Red Cross and other leading Humanitarian Medical Organizations.
            </p>
          </div>
        </div>
      )
    }

    // Empty state for departments without content
    return (
      <div className="py-12 text-center">
        <FileX className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="mb-2 text-xl font-semibold text-gray-500">Content Coming Soon</h3>
        <p className="max-w-md mx-auto text-gray-400">
          Detailed information for this department will be available soon. Please check back later for updates.
        </p>
      </div>
    )
  }

   return (
    <div className="min-h-[calc(100vh-49px)] bg-white">
      {/* Header */}
      <header className="bg-[#006699] text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Unified Service</h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100">
              Specialized units working together to serve communities and uphold our mission of humanitarian service
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto">
        {/* Toggleable Departments Section */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black">Department Details</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Click on any department below to learn more about their mission, responsibilities, and leadership
            </p>
          </div>

          <div className="space-y-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="border-[#006699]/20">
                <CardHeader
                  className="transition-colors cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleDepartment(dept.id)}
                >
                  <CardTitle className="text-[#006699]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0 w-16 h-16">
                          <Image
                            src={dept.image || "/placeholder.svg"}
                            alt={`${dept.name} Badge`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold">{dept.name}</h3>
                          <p className="mt-1 text-sm font-normal text-gray-600">{dept.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!dept.hasContent && (
                          <Badge variant="outline" className="text-gray-500 border-gray-300">
                            Coming Soon
                          </Badge>
                        )}
                        {expandedDepartment === dept.id ? (
                          <ChevronUp className="flex-shrink-0 w-5 h-5" />
                        ) : (
                          <ChevronDown className="flex-shrink-0 w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                {expandedDepartment === dept.id && (
                  <CardContent className="pt-0">
                    {/* Department Large Image */}
                    <div className="flex justify-center mb-8">
                      <div className="relative overflow-hidden bg-white border-none w-80 h-80 rounded-xl">
                        <Image
                          src={dept.image || "/placeholder.svg"}
                          alt={`${dept.name} Large Badge`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">{renderDepartmentContent(dept.id)}</div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

    
      </main>
    </div>
  )

}