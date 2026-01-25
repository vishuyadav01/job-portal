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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const applications = applicants?.applications || [];

  /* ================= DESKTOP TABLE ================= */
  const DesktopTable = () => (
    <Table>
      <TableCaption>Recent job applicants</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              No applicants found
            </TableCell>
          </TableRow>
        ) : (
          applications.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell>
                {item?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <StatusMenu
                  itemId={item._id}
                  statusHandler={statusHandler}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  /* ================= MOBILE CARDS ================= */
  const MobileCards = () => (
    <div className="space-y-4">
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">
          No applicants found
        </p>
      ) : (
        applications.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">
                  {item?.applicant?.fullname}
                </h3>
                <p className="text-sm text-gray-600">
                  {item?.applicant?.email}
                </p>
                <p className="text-sm text-gray-600">
                  {item?.applicant?.phoneNumber}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {item?.createdAt?.split("T")[0]}
                </p>

                {item?.applicant?.profile?.resume && (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    Download Resume
                  </a>
                )}
              </div>

              <StatusMenu
                itemId={item._id}
                statusHandler={statusHandler}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <DesktopTable />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCards />
      </div>
    </div>
  );
};

/* ================= STATUS MENU ================= */
const StatusMenu = ({ itemId, statusHandler }) => (
  <Popover>
    <PopoverTrigger className="cursor-pointer">
      <MoreHorizontal />
    </PopoverTrigger>

    <PopoverContent className="w-32">
      {shortlistingStatus.map((status) => (
        <div
          key={status}
          onClick={() => statusHandler(status, itemId)}
          className="flex items-center gap-2 cursor-pointer my-2"
        >
          <input type="radio" readOnly />
          <span>{status}</span>
        </div>
      ))}
    </PopoverContent>
  </Popover>
);

export default ApplicantsTable;
