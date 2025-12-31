import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { 
  Mail, Phone, MapPin, Clock, Send, MessageSquare, 
  Building2, Users, HelpCircle, FileText 
} from "lucide-react";

export default function Contact() {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Message sent! We'll get back to you within 24 hours.");
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@propertypool.pk",
      description: "For general inquiries",
      action: "mailto:info@propertypool.pk",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+92 300 123 4567",
      description: "Mon-Sat, 9 AM - 6 PM",
      action: "tel:+923001234567",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+92 300 123 4567",
      description: "Quick responses",
      action: "https://wa.me/923001234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "DHA Phase 5, Lahore",
      description: "By appointment only",
      action: "#",
    },
  ];

  const departments = [
    { icon: Users, name: "Investor Relations", email: "investors@propertypool.pk" },
    { icon: Building2, name: "Property Partnerships", email: "partners@propertypool.pk" },
    { icon: HelpCircle, name: "Customer Support", email: "support@propertypool.pk" },
    { icon: FileText, name: "Legal & Compliance", email: "legal@propertypool.pk" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "ہم سے رابطہ کریں" : "Contact Us"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "ur" 
                ? "ہم آپ کی مدد کے لیے حاضر ہیں"
                : "We're here to help with any questions you may have"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Contact Methods</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.title}</p>
                      <p className="text-purple-600">{method.value}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-purple-900">Office Hours</h3>
              </div>
              <div className="space-y-2 text-purple-800">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Departments</h3>
              <div className="space-y-3">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <dept.icon className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                      <a href={`mailto:${dept.email}`} className="text-sm text-purple-600 hover:underline">
                        {dept.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Office Location */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Head Office - Lahore</h3>
              <p className="text-gray-600 mb-4">
                PropertyPool Technologies (Pvt) Ltd<br />
                Office 501, 5th Floor, Arfa Software Technology Park<br />
                DHA Phase 5, Lahore, Pakistan 54000
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Phone:</strong> +92 42 3571 2345</p>
                <p><strong>Fax:</strong> +92 42 3571 2346</p>
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p>Map integration available</p>
                <p className="text-sm">DHA Phase 5, Lahore</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
