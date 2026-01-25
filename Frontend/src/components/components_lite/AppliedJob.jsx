import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <p className="text-center text-gray-600 my-6">
        You have not applied for any job yet.
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* ===== Desktop / Tablet Table ===== */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Recent Applied Jobs</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ===== Mobile Card View ===== */}
      <div className="md:hidden space-y-4">
        {allAppliedJobs.map((appliedJob) => (
          <div
            key={appliedJob._id}
            className="border rounded-md p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm">
                {appliedJob?.createdAt?.split("T")[0]}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Job</span>
              <span className="font-medium">
                {appliedJob?.job?.title}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-500">Company</span>
              <span>{appliedJob?.job?.company?.name}</span>
            </div>

            <div className="flex justify-end">
              <Badge
                className={`${
                  appliedJob?.status === "rejected"
                    ? "bg-red-500"
                    : appliedJob?.status === "accepted"
                    ? "bg-green-600"
                    : "bg-gray-500"
                }`}
              >
                {appliedJob?.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJob;
