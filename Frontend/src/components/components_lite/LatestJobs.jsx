import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  return (
    <div className="max-w-7xl mx-auto my-14 px-4 sm:px-6">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {allJobs.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No jobs available
          </p>
        ) : (
          allJobs.slice(0, 6).map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
