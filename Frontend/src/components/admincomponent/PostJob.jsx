import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
        <form
          onSubmit={submitHandler}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8"
        >
          <h1 className="text-xl font-bold mb-6 text-center">
            Post a New Job
          </h1>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                placeholder="Job title"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Job description"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                placeholder="Job location"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Salary"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Open positions"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                placeholder="Job requirements"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Experience required"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                placeholder="Full-time / Part-time / Remote"
                onChange={changeEventHandler}
              />
            </div>

            {/* COMPANY SELECT */}
            <div className="sm:col-span-2">
              <Label>Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 mt-2">
                  *Please register a company first.*
                </p>
              )}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-6">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Post Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
