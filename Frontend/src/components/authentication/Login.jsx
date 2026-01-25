import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
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
            Login
          </h1>

          {/* Email */}
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
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

          {/* Submit */}
          {loading ? (
            <div className="flex justify-center my-6">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 my-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Login
            </button>
          )}

          {/* Register */}
          <p className="text-center text-gray-500 text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-700 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
