
import React from "react";
import { motion } from "motion/react";
import {
  Heart,
  PawPrint,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

function About() {
  return (
    <div className="bg-[#F8F5EC] text-gray-800">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PawPrint className="mx-auto mb-5" size={42} />

            <h1 className="text-4xl md:text-6xl font-bold">
              About PETCO
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-lg text-white/80">
              Everything your pet needs, all in one place.
            </p>
          </motion.div>

        </div>
      </section>


      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[#2F5D50] font-semibold mb-2">
              OUR STORY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Made for pets. Built with love.
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              PETCO is a pet e-commerce platform created to make pet
              shopping simple and convenient. We bring useful products
              for pets together in one place so pet owners can easily
              find what they need.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              From everyday pet food to accessories and grooming
              products, PETCO is designed with pets and their owners
              in mind.
            </p>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#E7E1D5] rounded-3xl p-10 flex items-center justify-center"
          >
            <div className="text-center">

              <Heart
                size={70}
                className="mx-auto text-[#2F5D50]"
              />

              <h3 className="text-2xl font-bold mt-5">
                For Every Pet
              </h3>

              <p className="text-gray-600 mt-3">
                Because pets deserve the best care.
              </p>

            </div>
          </motion.div>

        </div>
      </section>


      {/* What We Offer */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-[#2F5D50] font-semibold">
              WHAT WE OFFER
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Everything your pet needs
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {/* Pet Food */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#F8F6F1] rounded-2xl p-8 text-center"
            >
              <ShoppingBag
                size={40}
                className="mx-auto text-[#2F5D50]"
              />

              <h3 className="text-xl font-semibold mt-5">
                Pet Food
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Find everyday food and treats for your furry friends.
              </p>
            </motion.div>


            {/* Accessories */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#F8F6F1] rounded-2xl p-8 text-center"
            >
              <PawPrint
                size={40}
                className="mx-auto text-[#2F5D50]"
              />

              <h3 className="text-xl font-semibold mt-5">
                Accessories
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Explore useful and fun accessories for your pets.
              </p>
            </motion.div>


            {/* Grooming */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#F8F6F1] rounded-2xl p-8 text-center"
            >
              <Sparkles
                size={40}
                className="mx-auto text-[#2F5D50]"
              />

              <h3 className="text-xl font-semibold mt-5">
                Grooming
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Keep your pets clean, comfortable and happy.
              </p>
            </motion.div>

          </div>

        </div>
      </section>


      {/* Why Choose PETCO */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <p className="text-[#2F5D50] font-semibold">
            WHY PETCO
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Why choose PETCO?
          </h2>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-7 bg-white rounded-2xl shadow-sm"
          >
            <ShieldCheck
              size={36}
              className="text-[#2F5D50]"
            />

            <h3 className="font-semibold text-lg mt-4">
              Quality Products
            </h3>

            <p className="text-gray-600 mt-2">
              Products selected with your pets in mind.
            </p>
          </motion.div>


          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-7 bg-white rounded-2xl shadow-sm"
          >
            <ShoppingBag
              size={36}
              className="text-[#2F5D50]"
            />

            <h3 className="font-semibold text-lg mt-4">
              Easy Shopping
            </h3>

            <p className="text-gray-600 mt-2">
              Browse products and find what your pet needs easily.
            </p>
          </motion.div>


          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-7 bg-white rounded-2xl shadow-sm"
          >
            <Truck
              size={36}
              className="text-[#2F5D50]"
            />

            <h3 className="font-semibold text-lg mt-4">
              Simple Ordering
            </h3>

            <p className="text-gray-600 mt-2">
              A simple shopping and checkout experience.
            </p>
          </motion.div>

        </div>

      </section>


      {/* Mission */}
      <section className="bg-gray-800 text-white">

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <PawPrint
            size={42}
            className="mx-auto"
          />

          <h2 className="text-3xl md:text-4xl font-bold mt-5">
            Our Mission
          </h2>

          <p className="mt-5 text-lg text-white/80 leading-8">
            Our mission is to make pet shopping simple, enjoyable and
            convenient while helping pet owners find products that
            make their pets happier and more comfortable.
          </p>

          <p className="mt-6 text-xl font-semibold">
            Because every pet deserves love and care. 🐾
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;

