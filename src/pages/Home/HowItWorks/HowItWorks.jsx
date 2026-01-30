import { FaUserPlus, FaSearch, FaComments } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8 mt-10 rounded-lg shadow">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#E91E63] mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-pink-50 border border-pink-200 hover:shadow-xl transition duration-300">
            <FaUserPlus className="text-5xl text-[#E91E63] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#AD1457]">Create Account</h3>
            <p className="text-gray-700">
              Sign up and complete your biodata to become a part of our community.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-pink-50 border border-pink-200 hover:shadow-xl transition duration-300">
            <FaSearch className="text-5xl text-[#E91E63] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#AD1457]">Browse Profiles</h3>
            <p className="text-gray-700">
              Explore premium and verified biodatas based on your preferences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-pink-50 border border-pink-200 hover:shadow-xl transition duration-300">
            <FaComments className="text-5xl text-[#E91E63] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#AD1457]">Connect & Communicate</h3>
            <p className="text-gray-700">
              Send requests, chat securely, and take the next step towards marriage.
            </p>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
