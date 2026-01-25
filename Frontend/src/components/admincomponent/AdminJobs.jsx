import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:max-w-xs"
            placeholder="Filter by name or job title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            Post New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
