import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, null, {
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const NavLinks = () => (
    <>
      {user && user.role === "Recruiter" ? (
        <>
          <Link to="/admin/companies">Companies</Link>
          <Link to="/admin/jobs">Jobs</Link>
        </>
      ) : (
        <>
          <Link to="/Home">Home</Link>
          <Link to="/Browse">Browse</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Creator">About</Link>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-[#6B3AC2]">Job</span>{" "}
          <span className="text-[#FA4F09]">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <NavLinks />

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user.role === "Student" && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/Profile")}
                  >
                    <User2 className="mr-2 h-4 w-4" /> Profile
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600"
                  onClick={logoutHandler}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4 font-medium">
          <div className="flex flex-col gap-3">
            <NavLinks />
          </div>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {user.role === "Student" && (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/Profile")}
                >
                  Profile
                </Button>
              )}
              <Button
                variant="ghost"
                className="text-red-600"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
