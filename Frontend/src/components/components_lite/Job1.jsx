import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";

const Job1 = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-lg bg-white border border-gray-100 flex flex-col">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div className="min-w-0">
          <h1 className="font-medium text-base sm:text-lg truncate">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job details */}
      <div className="flex-1">
        <h1 className="font-bold text-base sm:text-lg my-1 line-clamp-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job?.position} Positions
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>

        <Button className="w-full sm:w-auto bg-[#7209b7] hover:bg-[#5b0794]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
