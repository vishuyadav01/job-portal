import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-md shadow-md bg-white border border-gray-200 
                 cursor-pointer transition-all duration-300 
                 hover:shadow-xl hover:shadow-blue-200"
    >
      {/* Company */}
      <div className="mb-2">
        <h1 className="text-base sm:text-lg font-medium truncate">
          {job.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">India</p>
      </div>

      {/* Job Info */}
      <div className="mb-3">
        <h2 className="font-bold text-base sm:text-lg my-1 line-clamp-2">
          {job.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant="ghost" className="text-blue-600 font-bold">
          {job.position} Positions
        </Badge>

        <Badge variant="ghost" className="text-[#FA4F09] font-bold">
          {job.salary} LPA
        </Badge>

        <Badge variant="ghost" className="text-[#6B3AC2] font-bold">
          {job.location}
        </Badge>

        <Badge variant="ghost" className="text-black font-bold">
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
