import React from "react";
import Navbar from "../components_lite/Navbar";

// Import images (make sure filenames match exactly)
import anuj from "./Anuj.jpg";
import vishu from "./vishu.png";

const Creator = () => {
  return (
    <div>
      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Developers
        </h2>
        <p className="text-gray-600">
          Meet the developers behind this project
        </p>
      </div>

      {/* Developers Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Developer 1 - Anuj */}
          <div className="block text-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <img
              src={anuj}
              alt="Anuj Yadav"
              className="mx-auto h-52 w-52 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4 object-[center_20%]"
            />

            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              Anuj Yadav
            </h3>
            <p className="text-gray-600 text-sm mt-1 mb-4">
              Full Stack Web Developer
            </p>

            <a
              href="https://anuj-react-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              View Portfolio
            </a>
          </div>

          {/* Developer 2 - Vishu */}
          <div className="block text-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <img
              src={vishu}
              alt="Vishu Yadav"
              className="mx-auto h-52 w-52 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4 object-[center_20%]"
            />

            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              Vishu Yadav
            </h3>
            <p className="text-gray-600 text-sm mt-1 mb-4">
              Frontend / MERN Developer
            </p>

            <a
              href="http://vishu-react-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              View Portfolio
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Creator;
