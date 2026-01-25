import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Description = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...singleJob.applications,
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Apply failed");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch job details");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 my-10">{error}</p>;
  }

  if (!singleJob) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">
            {singleJob.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-600 font-bold">
              {singleJob.position} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#FA4F09] font-bold">
              {singleJob.salary} LPA
            </Badge>
            <Badge variant="ghost" className="text-[#6B3AC2] font-bold">
              {singleJob.location}
            </Badge>
            <Badge variant="ghost" className="text-black font-bold">
              {singleJob.jobType}
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`w-full md:w-auto rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#6B3AC2] hover:bg-[#552d9b]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Description */}
      <p className="border-b border-gray-300 py-6 mt-6 text-gray-800">
        {singleJob.description}
      </p>

      {/* Job Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base">
        <Detail label="Role" value={`${singleJob.position} Positions`} />
        <Detail label="Location" value={singleJob.location} />
        <Detail label="Salary" value={`${singleJob.salary} LPA`} />
        <Detail
          label="Experience"
          value={`${singleJob.experienceLevel} Year`}
        />
        <Detail
          label="Total Applicants"
          value={singleJob.applications?.length}
        />
        <Detail label="Job Type" value={singleJob.jobType} />
        <Detail
          label="Post Date"
          value={singleJob.createdAt.split("T")[0]}
        />
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <p className="font-semibold">
    {label}:
    <span className="pl-3 font-normal text-gray-700">{value}</span>
  </p>
);

export default Description;
