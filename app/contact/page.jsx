"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Address",
      content: "Fixymart ramghat road, Aligarh, India",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 9027442948",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@fixymart.com",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      content: "Mon - Sun: 8 AM - 10 PM",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>

        {/* Animated shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Let's Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Have a question or feedback? We'd love to hear from you. Our dedicated support team is here to assist you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto w-full px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${info.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {info.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{info.title}</h3>
              <p className="text-gray-600 leading-relaxed">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Form + Info Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-pulse">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">Message Sent!</h4>
                  <p className="text-sm text-green-700">Thank you for reaching out. We'll contact you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9027442948"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ / Additional Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose FixyMart?</h3>
              <ul className="space-y-4">
                {[
                  { title: "24/7 Support", desc: "Round-the-clock customer assistance" },
                  { title: "Quick Response", desc: "Responses within 24 hours" },
                  { title: "Expert Team", desc: "Highly trained professionals" },
                  { title: "Trusted Service", desc: "Serving 50,000+ customers" },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Tip</h3>
              <p className="text-gray-700">
                For urgent matters, please call us directly at <span className="font-semibold text-orange-600">+91 9027442948</span>. We're available 24/7!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full mt-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Find Us On The Map</h2>
          <div className="w-full h-[500px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl shadow-lg flex items-center justify-center text-gray-600 overflow-hidden">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-lg font-semibold">Google Map Integration Coming Soon</p>
              <p className="text-sm text-gray-600 mt-2">Interactive map will be available shortly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto text-center text-white px-5">
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Browse our FAQ section or connect with our support team right away
          </p>
          <a
            href="#"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
}

