import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[95vw] max-w-lg sm:rounded-lg"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-center sm:text-left">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field */}
          {[
            { label: "Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phoneNumber", type: "tel" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Skills", name: "skills", type: "text" },
          ].map((field) => (
            <div
              key={field.name}
              className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2 sm:gap-4"
            >
              <Label htmlFor={field.name} className="sm:text-right">
                {field.label}
              </Label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={input[field.name]}
                onChange={changeEventHandler}
                className="sm:col-span-3 border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          ))}

          {/* Resume */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="file" className="sm:text-right">
              Resume
            </Label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="sm:col-span-3 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
