import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:max-w-xs"
            placeholder="Filter by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            Add Company
          </Button>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
