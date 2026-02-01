import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-5xl text-[#E91E63] mb-4 relative z-10" />,
      title: "Create Account",
      desc: "Sign up and complete your biodata to become a part of our community.",
    },
    {
      icon: <FaSearch className="text-5xl text-[#E91E63] mb-4 relative z-10" />,
      title: "Browse Profiles",
      desc: "Explore premium and verified biodatas based on your preferences.",
    },
    {
      icon: <FaComments className="text-5xl text-[#E91E63] mb-4 relative z-10" />,
      title: "Connect & Communicate",
      desc: "Send requests, chat securely, and take the next step towards marriage.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white py-10 px-4 sm:px-6 lg:px-8 mt-10 rounded-lg shadow"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#E91E63] mb-10">
          How It Works
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-pink-50 overflow-hidden border border-transparent"
            >
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden rounded-full">
                <div className="w-1/2 h-1 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 animate-slide-border"></div>
              </div>

              {step.icon}
              <h3 className="text-xl font-semibold mb-2 text-[#AD1457] relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-700 relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes slide-border {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-border {
          animation: slide-border 2s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default HowItWorks;
