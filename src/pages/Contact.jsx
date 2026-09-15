import React, { useState } from "react";
import { motion } from "motion/react";
import {
  PawPrint,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);


    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#F8F5EC] text-gray-800">

      <section className="relative overflow-hidden bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PawPrint
              size={42}
              className="mx-auto mb-5"
            />

            <h1 className="text-4xl md:text-6xl font-bold">
              Contact PETCO
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-lg text-white/80">
              Have a question? We're here to help you and your furry
              friends.
            </p>
          </motion.div>

        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-5 gap-10">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >

            <p className="text-[#2F5D50] font-semibold mb-2">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We'd love to hear from you
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Whether you have a question about our products, your
              order, or anything else, feel free to contact us.
              Our team is happy to help.
            </p>


            <div className="flex items-start gap-4 mt-8">

              <div className="w-11 h-11 rounded-xl bg-[#E7E1D5] flex items-center justify-center shrink-0">
                <Mail
                  size={21}
                  className="text-[#2F5D50]"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="text-gray-600 mt-1">
                  support@petco.com
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 mt-6">

              <div className="w-11 h-11 rounded-xl bg-[#E7E1D5] flex items-center justify-center shrink-0">
                <Phone
                  size={21}
                  className="text-[#2F5D50]"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="text-gray-600 mt-1">
                 +6282838529
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 mt-6">

              <div className="w-11 h-11 rounded-xl bg-[#E7E1D5] flex items-center justify-center shrink-0">
                <MapPin
                  size={21}
                  className="text-[#2F5D50]"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  Location
                </h3>

                <p className="text-gray-600 mt-1">
                  Kerala, India
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 mt-6">

              <div className="w-11 h-11 rounded-xl bg-[#E7E1D5] flex items-center justify-center shrink-0">
                <Clock
                  size={21}
                  className="text-[#2F5D50]"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  Working Hours
                </h3>

                <p className="text-gray-600 mt-1">
                  Monday - Saturday
                </p>

                <p className="text-gray-600">
                  9:00 AM - 6:00 PM
                </p>
              </div>

            </div>

          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-sm p-6 sm:p-8"
          >

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-[#E7E1D5] flex items-center justify-center">
                <MessageCircle
                  size={22}
                  className="text-[#2F5D50]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Send us a message
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  We'll get back to you as soon as possible.
                </p>
              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50] focus:border-transparent transition"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50] focus:border-transparent transition"
                />
              </div>


              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50] focus:border-transparent transition"
                />
              </div>


              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50] focus:border-transparent transition resize-none"
                />
              </div>


              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#2F5D50] hover:bg-[#24493f] text-white py-3 rounded-xl font-semibold transition"
              >
                <Send size={19} />
                Send Message
              </motion.button>

            </form>

          </motion.div>

        </div>

      </section>


      {/* Help Section */}
      <section className="bg-white py-16">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <PawPrint
              size={40}
              className="mx-auto text-[#2F5D50]"
            />

            <h2 className="text-3xl md:text-4xl font-bold mt-5">
              Need help with your order?
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              If you have questions about your products, orders or
              shopping experience, our support team is here to help.
            </p>

          </motion.div>

        </div>

      </section>


      <section className="px-6 py-16">

        <div className="max-w-6xl mx-auto">

          <div className="bg-gray-800 rounded-3xl px-6 py-14 md:px-12 text-center text-white">

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >

              <PawPrint
                size={42}
                className="mx-auto mb-5"
              />

              <h2 className="text-3xl md:text-4xl font-bold">
                Looking for something for your pet?
              </h2>

              <p className="max-w-2xl mx-auto mt-4 text-white/80">
                Explore our collection and find something special
                for your furry friend.
              </p>

              <a
                href="/product"
                className="inline-flex items-center gap-2 mt-8 bg-white text-[#2F5D50] px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                <PawPrint size={20} />
                Shop Now
              </a>

            </motion.div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;


