import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-5 sm:p-8 shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="font-medium text-lg sm:text-xl">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="self-center sm:self-start"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <Mail />
            <a
              href={`mailto:${user?.email}`}
              className="text-blue-600 hover:underline break-all"
            >
              {user?.email}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm sm:text-base">
            <Contact />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="text-blue-600 hover:underline"
            >
              {user?.phoneNumber}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <h2 className="font-semibold mb-1">Resume</h2>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              Download {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">No Resume Found</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-0">
        <h1 className="text-lg font-bold my-5">Applied Jobs</h1>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
