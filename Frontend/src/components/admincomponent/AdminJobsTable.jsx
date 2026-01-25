import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filtered =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        const q = searchJobByText.toLowerCase();
        return (
          job.title?.toLowerCase().includes(q) ||
          job.company?.name?.toLowerCase().includes(q)
        );
      }) || [];
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) return <p>Loading...</p>;

  return (
    <div>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableCaption>Your recent posted jobs</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500"
                >
                  No Job Added
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.company?.name}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    {job.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionMenu job={job} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {filterJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No Job Added
          </p>
        ) : (
          filterJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {job.company?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {job.createdAt?.split("T")[0]}
                  </p>
                </div>

                <ActionMenu job={job} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ================= ACTION MENU ================= */
const ActionMenu = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <MoreHorizontal />
      </PopoverTrigger>

      <PopoverContent className="w-36">
        <div
          onClick={() => navigate(`/admin/companies/${job._id}`)}
          className="flex items-center gap-2 cursor-pointer mb-2"
        >
          <Edit2 className="w-4" />
          <span>Edit</span>
        </div>

        <hr />

        <div
          onClick={() =>
            navigate(`/admin/jobs/${job._id}/applicants`)
          }
          className="flex items-center gap-2 cursor-pointer mt-2"
        >
          <Eye className="w-4" />
          <span>Applicants</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminJobsTable;
