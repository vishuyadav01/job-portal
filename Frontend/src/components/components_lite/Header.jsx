import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6">
      <div className="flex flex-col gap-6 my-10 sm:my-14">
        {/* Badge */}
        <span className="px-4 py-2 mx-auto flex items-center gap-2 rounded-full bg-gray-200 text-red-600 font-medium text-sm sm:text-base">
          <PiBuildingOfficeBold className="text-[#614232]" />
          No.1 Job Hunt Website
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Search Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Start your hunt for the best, life-changing career opportunities from
          here in your selected areas conveniently and get hired quickly.
        </p>

        {/* Search Bar */}
        <div className="flex w-full sm:w-[70%] lg:w-[40%] mx-auto shadow-lg border border-gray-300 pl-4 rounded-full items-center gap-3">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream job"
            className="outline-none border-none w-full py-3 text-sm sm:text-base"
          />
          <Button
            onClick={searchjobHandler}
            className="rounded-full px-5"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
