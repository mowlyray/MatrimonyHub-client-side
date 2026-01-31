import React from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const ContactUs = () => {
  const contactDetails = [
    {
      icon: <MdPhone className="text-pink-600 text-2xl" />,
      text: "+880 123 456 789",
    },
    {
      icon: <MdEmail className="text-pink-600 text-2xl" />,
      text: "support@matrimonyhub.com",
    },
    {
      icon: <MdLocationOn className="text-pink-600 text-2xl" />,
      text: "Sylhet, Shibganj 3, Bangladesh",
    },
  ];

  return (
    <section className="bg-[#FCE4EC] py-16 px-6 md:px-20 overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-pink-700">Contact Us</h2>
        <p className="text-gray-700 text-lg mt-3">
          We'd love to hear from you! Reach out with any questions or feedback.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Map + Info */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col space-y-6"
        >
          {/* Google Map */}
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="MatrimonyHub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.924840508136!2d91.86150931537807!3d24.895599284049526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375052a8e8d97f3f%3A0xd56d3b9316bfb80c!2sSibganj%2C%20Sylhet%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1695200000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.icon}
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-bold text-pink-700">Send us a message</h3>
          <p className="text-gray-700 text-lg">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-4 bg-white p-6 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold w-full"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
