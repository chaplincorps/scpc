"use client"

import {
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  FileText,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Send,
  AlertCircle,
  Users,
  Loader2,
  Heart,
  ListX 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SupportLogic from "./SupportLogic"
import Link from "next/link"
import ArticleDocsModal from "./ArticleDocsModal"
import Image from "next/image"
import facebook from '@svg/facebook.svg'
import whatsapp from '@svg/whatsapp.svg'
import twitter from '@svg/twitter.svg'
import telegram from '@svg/telegram.svg'


export default function SupportView (){

   const {
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
  } = SupportLogic()
  

    return (
    <div className="min-h-[calc(100vh-49px)] bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#006699] to-[#004d73] text-white py-16 md:py-24">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 mr-4 text-white" />
              <h1 className="text-4xl font-bold md:text-5xl">How Can We Help You?</h1>
            </div>
            <p className="mb-8 text-xl text-blue-50">
              Find answers, get support, and learn more about Chaplin Corps' mission to serve our community.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                className="bg-white text-[#006699] hover:bg-gray-100 h-12 px-6 rounded-xl shadow-md"
                onClick={scrollToContactForm}
              >
                Contact Support
                <MessageSquare className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-[#004d73] h-12 px-6 rounded-xl"
              >
                Visit Our Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="container px-4 mx-auto max-w-[90%] md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-center justify-start md:justify-start">
              <div className="bg-[#006699]/10 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-[#006699]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Response Time</p>
                <p className="text-xl font-bold text-gray-900">Under 4 Hours</p>
              </div>
            </div>
            <div className="flex items-center justify-start md:justify-start">
              <div className="bg-[#006699]/10 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-[#006699]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Community Served</p>
                <p className="text-xl font-bold text-gray-900">1000+ Families</p>
              </div>
            </div>
            <div className="flex items-center justify-start md:justify-start">
              <div className="bg-[#006699]/10 p-3 rounded-full mr-4">
                <Heart className="h-6 w-6 text-[#006699]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Support Hours</p>
                <p className="text-xl font-bold text-gray-900">24/7 Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto max-w-[90%] md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Support Categories */}
          <div className="lg:w-1/4">
            <div className="sticky overflow-hidden bg-white border border-gray-100 shadow-sm top-24 rounded-xl">
              <div className="p-5 border-b border-gray-100 bg-[#006699]/5">
                <h3 className="mb-1 font-bold text-gray-800">Support Categories</h3>
                <p className="text-sm text-gray-600">Browse by topic</p>
              </div>
              <div className="p-4">
                <nav>
                  <ul className="space-y-1">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => {
                            setActiveCategory(category.id)
                            setSearchQuery("")
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center ${
                            activeCategory === category.id
                              ? "bg-[#006699]/10 text-[#006699] font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="p-4 bg-[#006699]/5 border-t border-[#006699]/10">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Can't find what you're looking for? Contact our support team for personalized assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Category Description */}
            {searchQuery.trim() === "" && (
              <div className="mb-8">
                <h2 className="flex items-center mb-2 text-2xl font-bold text-gray-800">
                  {categories.find((c) => c.id === activeCategory)?.icon && (
                    <span className="mr-2 bg-[#006699]/10 p-2 rounded-full">
                      {categories.find((c) => c.id === activeCategory)?.icon}
                    </span>
                  )}
                  {categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600">{categories.find((c) => c.id === activeCategory)?.description}</p>
              </div>
            )}

            {/* Search Results Header */}
            {searchQuery.trim() !== "" && (
              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">Search Results: "{searchQuery}"</h2>
                <p className="text-gray-600">Found {filteredFaqs.length} results matching your query</p>
                <Button
                  variant="outline"
                  className="mt-2 text-[#006699] border-[#006699]/20"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}

            {/* FAQ Accordion */}
            <div className="mb-12">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Frequently Asked Questions</h3>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
                    >
                      <button
                        className="flex justify-between items-center w-full p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] focus:ring-opacity-50 rounded-t-xl"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${activeFaq === faq.id ? "bg-[#006699] text-white" : "bg-[#006699]/10 text-[#006699]"}`}
                          >
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <h4 className="font-medium text-gray-800">{faq.question}</h4>
                        </div>
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${activeFaq === faq.id ? "bg-[#006699]/10 text-[#006699] rotate-180" : "bg-gray-100 text-gray-500"}`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="p-5 bg-[#006699]/5 border-t border-[#006699]/10">
                          <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                          <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-gray-500">Was this helpful?</p>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-[#006699] border-[#006699]/20"
                              >
                                Yes
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-3 text-gray-600 border-gray-200">
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100">
                    <AlertCircle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium text-gray-800">No results found</h4>
                  <p className="mb-4 text-gray-600">
                    We couldn't find any FAQs matching your search. Try different keywords or contact our support team.
                  </p>
                  <Button className="bg-[#006699] hover:bg-[#004d73] text-white" onClick={scrollToContactForm}>
                    Contact Support
                  </Button>
                </div>
              )}
            </div>

            {/* Support Articles */}
            {searchQuery.trim() === "" && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Helpful Resources</h3>
                  <Button variant="outline" className="text-[#006699] border-[#006699]/20" onClick={() => { setArticleModalOpen(true); setInitialArticle(null); }}>
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {supportArticles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                     <ListX className="w-10 h-10 text-[#006699]"  />
                    <div className="text-sm text-gray-500">No helpful resources available yet.</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {supportArticles.map((article, index) => (
                      <Card key={index} className="transition-shadow duration-300 border-gray-200 hover:shadow-md">
                        <CardContent className="p-0">
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <Badge className="bg-[#006699]/10 text-[#006699] border-0 font-medium">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{article.readTime}</span>
                            </div>
                            <h4 className="mb-2 font-medium text-gray-800">{article.title}</h4>
                            <p className="mb-4 text-sm text-gray-600">{article.description}</p>
                            <Button variant="link" className="p-0 h-auto text-[#006699] hover:text-[#004d73]" onClick={() => { setArticleModalOpen(true); setInitialArticle(article.id); }}>
                              Read Article
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                {/* Article Docs Modal */}
                <ArticleDocsModal
                  open={articleModalOpen}
                  onClose={() => setArticleModalOpen(false)}
                  articles={supportArticles}
                  initialArticle={initialArticle}
                />
              </div>
            )}

            {/* Contact Support Form */}
            <div ref={contactFormRef} className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl">
              <div className="p-6 bg-[#006699]/5 border-b border-[#006699]/10">
                <h3 className="mb-2 text-xl font-bold text-gray-800">Contact Support</h3>
                <p className="text-gray-600">
                  Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="p-6">
                <Tabs defaultValue="message" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger
                      value="message"
                      className="data-[state=active]:bg-[#006699]/10 data-[state=active]:text-[#006699]"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </TabsTrigger>
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-[#006699]/10 data-[state=active]:text-[#006699]"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="phone"
                      className="data-[state=active]:bg-[#006699]/10 data-[state=active]:text-[#006699]"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="message" className="mt-0">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="relative">
                          <FloatingLabelInput
                            id="name"
                            label="Name"
                            type="text"
                            register={register("name")}
                            errors={errors.name}
                            isFocused={isNameFocused}
                            setIsFocused={setIsNameFocused}
                            watchedValue={watchedName}
                            disabled={isSubmitting}
                            isValid={isNameValid}
                          />
                        </div>

                        <div className="relative">
                          <FloatingLabelInput
                            id="email"
                            label="Email Address"
                            type="email"
                            register={register("email")}
                            errors={errors.email}
                            isFocused={isEmailFocused}
                            setIsFocused={setIsEmailFocused}
                            watchedValue={watchedEmail}
                            disabled={isSubmitting}
                            isValid={isEmailValid}
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <FloatingLabelInput
                          id="subject"
                          label="Subject"
                          type="text"
                          register={register("subject")}
                          errors={errors.subject}
                          isFocused={isSubjectFocused}
                          setIsFocused={setIsSubjectFocused}
                          watchedValue={watchedSubject}
                          disabled={isSubmitting}
                          isValid={isSubjectValid}
                        />
                      </div>

                      <div className="relative">
                        <FloatingLabelTextArea
                          id="message"
                          label="Message"
                          type="textarea"
                          register={register("message")}
                          errors={errors.message}
                          isFocused={isMessageFocused}
                          setIsFocused={setIsMessageFocused}
                          watchedValue={watchedMessage}
                          disabled={isSubmitting}
                          isValid={isMessageValid}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#006699] rounded hover:bg-[#004d73] text-white h-12"
                        disabled={!isFormReadyToSubmit}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="email" className="mt-0">
                    <div className="py-8 text-center">
                      <Mail className="h-12 w-12 text-[#006699] mx-auto mb-4" />
                      <h4 className="mb-2 text-lg font-medium text-gray-800">Email Support</h4>
                      <p className="mb-6 text-gray-600">Send us an email directly and we'll respond within 24 hours.</p>
                      <div className="inline-flex items-center justify-center bg-[#006699]/10 px-4 py-2 rounded-lg text-[#006699] font-medium mb-4">
                        support@chaplincorps.org.ng
                      </div>
                      <p className="text-sm text-gray-500">
                        Please include your contact information and any relevant details in your message.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="mt-0">
                    <div className="py-8 text-center">
                      <Phone className="h-12 w-12 text-[#006699] mx-auto mb-4" />
                      <h4 className="mb-2 text-lg font-medium text-gray-800">Phone Support</h4>
                      <p className="mb-6 text-gray-600">Call our support team for immediate assistance.</p>
                      <div className="inline-flex items-center justify-center bg-[#006699]/10 px-4 py-2 rounded-lg text-[#006699] font-medium mb-4">
                        +234 (0) 803 123 4567
                      </div>
                      <p className="text-sm text-gray-500">Available Monday to Friday, 8am - 6pm WAT</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Support Options */}
      <div className="mx-auto max-w-[90%] py-16 border-t border-gray-200 bg-gray-50">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <h2 className="mb-12 text-2xl font-bold text-center text-gray-800">More Ways to Get Support</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="w-16 h-16 bg-[#006699]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-[#006699]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Resource Center</h3>
              <p className="mb-6 text-gray-600">Browse our comprehensive guides, resources, and documentation.</p>
              <Button
                variant="outline"
                className="w-full border-[#006699]/20 text-[#006699] rounded hover:bg-[#006699]/5 cursor-pointer"
                onClick={() => { setArticleModalOpen(true); setInitialArticle(null); }}
              >
                Explore Resources
              </Button>
            </div>

            <div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="w-16 h-16 bg-[#006699]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-[#006699]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Live Chat</h3>
              <p className="mb-6 text-gray-600">Chat with our support team in real-time for immediate assistance.</p>
              <Button 
               onClick={openChat}
               className="w-full bg-[#006699] rounded hover:bg-[#004d73] text-white cursor-pointer">Start Chat</Button>
            </div>

            <div className="relative p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="w-16 h-16 bg-[#006699]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#006699]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Community Forum</h3>
              <p className="mb-6 text-gray-600">
                Connect with other community members, share experiences, and get advice.
              </p>
              <Button
                variant="outline"
                className="w-full border-[#006699]/20 text-[#006699] rounded hover:bg-[#006699]/5 cursor-pointer"
                onClick={() => setShowCommunityPop((v) => !v)}
              >
                Join Community
              </Button>
              {showCommunityPop && (
                <div className="absolute left-1/2 bottom-20 z-30 mt-4 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl p-6 flex flex-col items-center min-w-[260px] animate-fade-in">
                  <div className="mb-2 text-sm font-semibold text-gray-700">Join us on:</div>
                  <div className="flex mb-2">
                    <Link 
                        href="https://chat.whatsapp.com/your-group-link"
                        target="blank"
                        className="hover:bg-[#006699]/20 rounded-full p-3 transition"
                     >
                        <Image 
                           src={whatsapp} 
                           alt="WhatsApp"
                           className="w-[100px]" 
                        />
                    </Link>
                    <Link 
                        href="https://facebook.com/your-community-link"
                        target="blank"
                         className="hover:bg-[#006699]/20 rounded-full p-3 transition"
                     >
                        <Image 
                           src={facebook} 
                           alt="Facebook"
                            className="w-[100px]" 
                        />
                    </Link>
                    <Link 
                        href="https://twitter.com/your-community-link"
                        target="blank"
                        className="hover:bg-[#006699]/20 rounded-full p-3 transition"
                     >
                        <Image
                              src={twitter}
                              alt="Twitter"
                              className="w-[100px]" 
                         />
                    </Link>
                    <Link 
                        href="https://t.me/your-community-link"
                        target="blank"
                        className="hover:bg-[#006699]/20 rounded-full p-3 transition"
                    >
                     
                        <Image 
                           src={telegram} 
                           alt="Telegram"
                           className="w-[100px]" 
                        />

                    </Link>
                  </div>
                  <button
                    className="mt-2 text-xs text-gray-500 hover:text-[#006699] underline"
                    onClick={() => setShowCommunityPop(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}