import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const SuccessCounter = () => {
    const [stats, setStats] = useState(null);
  
  // const [stats, setStats] = useState({
  //   totalBiodatas: 0,
  //   totalBoys: 0,
  //   totalGirls: 0,
  //   totalMarriages: 0,
  // });

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/success-stats")
  //     .then(res => res.json())
  //     .then(data => setStats(data))
  //     .catch(err => console.error("Failed to fetch stats", err));
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/biodatas");
      const alldata = res.data;

      const length1 = alldata.length;
      const ff = alldata.filter(f1 => f1.biodataType === "Male");
      const length2 = ff.length;
      const length3 = length1 - length2;

      setTimeout(() => {
        const dummyData = {
          totalBiodatas: length1,
          totalBoys: length2,
          totalGirls: length3,
          totalMarriages: 15, // in BDT
        };
        setStats(dummyData);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch biodatas:", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="py-16 bg-pink-50 text-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-10">Our Success in Numbers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Total Biodatas</p>
          <h3 className="text-4xl text-pink-600 font-bold">
            <CountUp end={stats?.totalBiodatas} duration={2} />
          </h3>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Boys Biodatas</p>
          <h3 className="text-4xl text-blue-600 font-bold">
            <CountUp end={stats?.totalBoys} duration={2} />
          </h3>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Girls Biodatas</p>
          <h3 className="text-4xl text-pink-600 font-bold">
            <CountUp end={stats?.totalGirls} duration={2} />
          </h3>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Marriages Done</p>
          <h3 className="text-4xl text-green-600 font-bold">
            <CountUp end={stats?.totalMarriages} duration={2} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
