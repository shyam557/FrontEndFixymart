"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, Zap, Heart, CheckCircle, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

/**
 * Notes:
 * - This is a self-contained client component. Paste into /app/about/page.jsx
 * - Replace image URLs with your assets or Next/Image if you prefer.
 * - framer-motion gives subtle entrance & hover animations.
 */

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
    }),
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1 * i, duration: 0.5 },
    }),
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                  About FixyMart
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                We Fix Your Home,  
                <span className="text-blue-600"> Your Way</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Professional home services with verified experts, transparent pricing, and exceptional support. We bring reliable repairs and maintenance right to your doorstep.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <p className="text-gray-600 text-sm">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <p className="text-gray-600 text-sm">Expert Professionals</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">4.8★</div>
                  <p className="text-gray-600 text-sm">Avg Rating</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                  Book Service <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl opacity-10"></div>
              <img
                src="https://images.unsplash.com/photo-1581578017421-6f0cfb2c3b9f?q=80&w=600&auto=format&fit=crop"
                alt="Professional services"
                className="rounded-3xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FixyMart?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional service with integrity, expertise, and customer focus.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Verified Experts",
                desc: "Background-checked, trained professionals with verified credentials",
                color: "blue",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "On-Time Guarantee",
                desc: "We respect your time. Punctual service every single time",
                color: "green",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Quick Booking",
                desc: "Easy scheduling within minutes with flexible time slots",
                color: "purple",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Quality Assured",
                desc: "Satisfaction guaranteed with professional-grade workmanship",
                color: "orange",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "24/7 Support",
                desc: "Round-the-clock customer care for peace of mind",
                color: "red",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Transparent Pricing",
                desc: "No hidden charges — clear, upfront pricing always",
                color: "indigo",
              },
            ].map((item, idx) => {
              const colorMap = {
                blue: "from-blue-500 to-blue-600",
                green: "from-green-500 to-green-600",
                purple: "from-purple-500 to-purple-600",
                orange: "from-orange-500 to-orange-600",
                red: "from-red-500 to-red-600",
                indigo: "from-indigo-500 to-indigo-600",
              };
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx + 1}
                  variants={scaleIn}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[item.color]} rounded-xl flex items-center justify-center text-white mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How FixyMart Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to get expert service at your convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0"></div>

            {[
              { step: 1, title: "Choose Service", desc: "Browse & select from 50+ service categories" },
              { step: 2, title: "Pick Slot", desc: "Choose your preferred date & time" },
              { step: 3, title: "Expert Visit", desc: "Trained professional arrives prepared" },
              { step: 4, title: "Hassle-Free Payment", desc: "Secure payment with multiple options" },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 1}
                variants={fadeUp}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow relative z-10 border-2 border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from satisfied customers across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                city: "Delhi",
                text: "Excellent service! The plumber arrived on time and fixed the issue perfectly. Very professional.",
                rating: 5,
                image: "👨‍💼",
              },
              {
                name: "Priya Sharma",
                city: "Mumbai",
                text: "Great experience! The electrician was knowledgeable and the pricing was transparent. Highly recommended!",
                rating: 5,
                image: "👩‍💼",
              },
              {
                name: "Amit Patel",
                city: "Bangalore",
                text: "Fast booking, professional staff, and excellent execution. FixyMart is my go-to for home services.",
                rating: 5,
                image: "👨‍💼",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 1}
                variants={fadeUp}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.city}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Professional Service?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers. Book a trusted expert today and experience hassle-free home services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                Book Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                Explore Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
