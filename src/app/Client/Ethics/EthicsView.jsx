"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Shield, Heart, Scale, Award } from "lucide-react"


export default function EthicsView(){
   return (
    <div className="min-h-[calc(100vh-49px)] bg-white">
      {/* Header */}
      <header className="bg-[#006699] text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Ethical Formation</h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100">
              A comprehensive guide for SCPC officers to develop autonomous morality and self-policing virtues
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto">
        {/* Table of Contents */}
        <Card className="mb-12 border-[#006699]/20">
          <CardHeader>
            <CardTitle className="text-[#006699]">
              <div className="flex items-center gap-3">
                <Users className="flex-shrink-0 w-5 h-5" />
                <span>Table of Contents</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <button
                  onClick={() => document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth" })}
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  1. Introduction
                </button>
                <button
                  onClick={() =>
                    document.getElementById("fundamental-concepts")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  2. Fundamental Concepts
                </button>
                <button
                  onClick={() => document.getElementById("premise")?.scrollIntoView({ behavior: "smooth" })}
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  3. The Premise of Ethics in SCPC
                </button>
                <button
                  onClick={() => document.getElementById("frameworks")?.scrollIntoView({ behavior: "smooth" })}
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  4. Ethical Frameworks
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => document.getElementById("moral-molecules")?.scrollIntoView({ behavior: "smooth" })}
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  5. Moral Molecules
                </button>
                <button
                  onClick={() => document.getElementById("implementation")?.scrollIntoView({ behavior: "smooth" })}
                  className="block w-full text-left hover:text-[#006699] transition-colors"
                >
                  6. Implementation for SCPC
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction Section */}
        <section id="introduction" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <BookOpen className="flex-shrink-0 w-6 h-6" />
                  <span>1. Introduction</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Purpose of this Document</h3>
                <p className="leading-relaxed text-gray-700">
                  This handout is meant for general awareness about the importance of Ethics in human affairs today. It
                  is not strictly an academic presentation but a practical guide for SCPC officers to develop autonomous
                  morality and self‑policing virtues.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">What Is Ethics?</h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Ethics, simply put, is a spectrum of moral behaviors or the science which deals with morals.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#006699]">
                  <h4 className="mb-2 font-semibold text-black">Collins English Dictionary definition:</h4>
                  <p className="italic leading-relaxed text-gray-700">
                    "The philosophical study of moral values of human conduct and of rules and principles that ought to
                    govern it; or social, religious, or civil code of behaviors considered correct especially that of a
                    particular group, professional organization or an individual; or the moral fitness of a decision,
                    course of an action or the content and art of the application of moral values according to the types
                    of groups, cultures, professions, organizations, politics/governance or systems, or moral values or
                    principles of behavior governing a person or group; or that ethics is the science or knowledge of
                    the principles, the application and the practice of good conduct."
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Key Insight</h3>
                <p className="leading-relaxed text-gray-700">
                  Ethics is centrally situated as the key to social and economic progress. When ethical principles guide
                  actions, trust is built, and communities thrive.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Integrity Defined</h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  If ethics is the ability to apply the principles of good character, then the capacity of the sustained
                  will‑power to apply ethics consistently is INTEGRITY, which is evidence of a steadfast commitment to
                  moral values.
                </p>

                <div className="bg-[#006699]/5 p-4 rounded-lg">
                  <p className="font-semibold text-[#006699]">
                    Formula: Ethics + Integrity + Examples = Effective Citizenship and Leadership Capacity
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Purpose for SCPC Officers</h3>
                <p className="leading-relaxed text-gray-700">
                  To cultivate chaplains who can self‑police themselves—guided by autonomous morality—to observe moral
                  virtues in all domains: home, work, politics, governance, enterprises, professions,
                  spiritual/religious settings, sports, and recreation. Ethics is the divine wisdom for the politics of
                  development.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Fundamental Concepts Section */}
        <section id="fundamental-concepts" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <Scale className="flex-shrink-0 w-6 h-6" />
                  <span>2. Fundamental Concepts: Principles, Morals, Values</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3 text-[#006699]">2.1. Principles</h3>
                  <p className="leading-relaxed text-gray-700">
                    A principle is a fundamental or general truth that serves as the foundation for a system of belief
                    or behavior. It is a source of fundamental cause, origin, or rule of law concerning the behavior of
                    a system.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3 text-[#006699]">2.2. Morals</h3>
                  <p className="leading-relaxed text-gray-700">
                    Morals are virtues or character principles without explicit reference to religion. Morality is the
                    quality of being moral; the moral sense or conscience.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3 text-[#006699]">2.3. Values</h3>
                  <p className="leading-relaxed text-gray-700">
                    Values are the morals, codes, virtues, principles, commandments, or constitutions/laws that guide
                    behavior. They unite people under a common vision and purpose.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Why This Matters for SCPC</h3>
                <div className="space-y-3">
                  <blockquote className="border-l-4 border-[#006699] pl-4 italic text-gray-700">
                    "Absence of Character is the beginning of all crises." — Dr. David Oyedepo, Nigeria
                  </blockquote>
                  <blockquote className="border-l-4 border-[#006699] pl-4 italic text-gray-700">
                    "When every man lives without law, every man lives without freedom." — Pope Benedict XVI (Joseph
                    Ratzinger)
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Premise Section */}
        <section id="premise" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <Heart className="flex-shrink-0 w-6 h-6" />
                  <span>3. The Premise of Ethics in SCPC</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 bg-[#006699]/5 rounded-lg">
                  <h3 className="text-lg font-bold text-[#006699] mb-2">ETHICS HARMONIZE</h3>
                  <p className="text-gray-700">Ethics bring order and coherence</p>
                </div>
                <div className="text-center p-6 bg-[#006699]/5 rounded-lg">
                  <h3 className="text-lg font-bold text-[#006699] mb-2">VALUES UNITE</h3>
                  <p className="text-gray-700">Shared values create solidarity</p>
                </div>
                <div className="text-center p-6 bg-[#006699]/5 rounded-lg">
                  <h3 className="text-lg font-bold text-[#006699] mb-2">ETHICS IS THE ROOT OF UNITY</h3>
                  <p className="text-gray-700">Unity is the oneness of mind, values, vision, and goals</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-black">Transformational Insight</h3>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#006699]">
                  <p className="leading-relaxed text-gray-700">
                    "Transformation means renewal of the spirit/inner mind—change of nature. Autonomous morality is
                    self‑policing by individuals without external enforcement, guided by moral willpower."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ethical Frameworks Section */}
        <section id="frameworks" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <Shield className="flex-shrink-0 w-6 h-6" />
                  <span>4. Ethical Frameworks Across Domains</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Religious Ethics */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-black">4.1. Religious Ethics</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Christianity</h4>
                    <p className="text-gray-700">
                      All content of righteousness or obedience to the Word/commanding of Jehovah God.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Islam</h4>
                    <p className="text-gray-700">All content of Sharia and Hadith.</p>
                  </div>
                </div>
              </div>

              {/* Clinical Ethics */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-black">4.2. Clinical Ethics</h3>
                <p className="mb-4 text-gray-700">The Four Main Principles:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Badge variant="outline" className="border-[#006699] text-[#006699]">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-black">Beneficence</h4>
                      <p className="text-gray-700">Act in the patient's best interest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Badge variant="outline" className="border-[#006699] text-[#006699]">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-black">Nonmaleficence</h4>
                      <p className="text-gray-700">Do no harm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Badge variant="outline" className="border-[#006699] text-[#006699]">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-black">Autonomy</h4>
                      <p className="text-gray-700">Respect the patient's choices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Badge variant="outline" className="border-[#006699] text-[#006699]">
                      4
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-black">Justice</h4>
                      <p className="text-gray-700">Distribute benefits, risks, and costs fairly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Military Ethics */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-black">4.3. Military Ethics</h3>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-black">Core Values:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Truth", "Justice", "Equality", "Integrity", "Courage"].map((value) => (
                      <Badge key={value} className="bg-[#006699] text-white">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#006699]">
                  <h4 className="mb-2 font-semibold text-black">American Military Code of Ethics (Excerpt):</h4>
                  <p className="italic leading-relaxed text-gray-700">
                    "I will make no oral or written statements disloyal to my country and its allies or harmful to their
                    cause. I will never forget that I am an American fighting for freedom, responsible for my actions
                    and dedicated to the principles which make my country free."
                  </p>
                </div>
              </div>

              {/* Humanitarian Ethics */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-black">4.4. Humanitarian Ethics</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Humanity</h4>
                    <p className="text-gray-700">Alleviate suffering wherever it's found</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Neutrality</h4>
                    <p className="text-gray-700">Do not take sides in hostilities</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Impartiality</h4>
                    <p className="text-gray-700">Aid based on needs alone</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-[#006699] mb-2">Independence</h4>
                    <p className="text-gray-700">Operate free from political, economic, or military influence</p>
                  </div>
                </div>
              </div>

              {/* Professional Ethics */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-black">4.5. Professional Ethics (Corporate & Civic)</h3>
                <p className="mb-4 text-gray-700">Five Codes of Ethics:</p>
                <div className="space-y-3">
                  {[
                    "Integrity",
                    "Objectivity",
                    "Professional Competency and Due Care",
                    "Confidentiality",
                    "Professional Behavior",
                  ].map((code, index) => (
                    <div key={code} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Badge variant="outline" className="border-[#006699] text-[#006699]">
                        {index + 1}
                      </Badge>
                      <span className="text-gray-700">{code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Moral Molecules Section */}
        <section id="moral-molecules" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <Award className="flex-shrink-0 w-6 h-6" />
                  <span>5. Moral Molecules</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 leading-relaxed text-gray-700">
                These are the building blocks of ethical character—core virtues that SCPC officers embody:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Family Values",
                  "Group Loyalty",
                  "Fairness / Reciprocity",
                  "Heroism",
                  "Authority / Respect",
                  "Purity / Sanctity",
                ].map((molecule) => (
                  <div key={molecule} className="p-4 bg-[#006699]/5 rounded-lg text-center">
                    <h4 className="font-semibold text-[#006699]">{molecule}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Implementation Section */}
        <section id="implementation" className="mb-12">
          <Card className="border-[#006699]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#006699]">
                <div className="flex items-center gap-3">
                  <Users className="flex-shrink-0 w-6 h-6" />
                  <span>6. Implementation for SCPC</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-black">6.1. Training & Certification</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mandatory modules on each framework (e.g., clinical, military, humanitarian)</li>
                    <li>• Annual refresher courses</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-black">6.2. Acknowledgment & Compliance</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Digital signature or quiz completion required before gaining full platform access</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-black">6.3. Reporting Misconduct</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Whistleblower channels with anonymity and protection</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-black">6.4. Audit & Review</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Yearly ethics audit by the SCPC Ethics Council</li>
                    <li>• Revision history logged below</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}