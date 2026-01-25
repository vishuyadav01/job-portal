import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();
    const filtered = allJobs.filter((job) =>
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.experience?.toLowerCase().includes(query) ||
      job.salary?.toLowerCase().includes(query)
    );

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filter Section */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <p className="text-center text-gray-500 mt-20">
                No jobs found
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
