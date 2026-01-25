import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center px-4 sm:px-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-6 text-center text-blue-600">
            Register
          </h1>

          {/* Inputs */}
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "PAN Card", name: "pancard", type: "text" },
            { label: "Aadhar Card", name: "adharcard", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
          ].map((field) => (
            <div key={field.name} className="mb-3">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                value={input[field.name]}
                onChange={changeEventHandler}
                required
              />
            </div>
          ))}

          {/* Role */}
          <div className="my-4">
            <Label>Role</Label>
            <RadioGroup className="flex gap-6 mt-2">
              {["Student", "Recruiter"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                  />
                  {role}
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* File */}
          <div className="my-4">
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
          </div>

          {/* Submit */}
          {loading ? (
            <div className="flex justify-center my-6">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md"
            >
              Register
            </button>
          )}

          <p className="text-center text-gray-500 text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
