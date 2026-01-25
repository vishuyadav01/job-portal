import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName?.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error("Failed to create company");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-bold text-xl sm:text-2xl">
              Company Details
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your company name to continue
            </p>
          </div>

          {/* Input */}
          <div className="mb-6">
            <Label>Company Name</Label>
            <Input
              type="text"
              placeholder="e.g. Google, Amazon, Infosys"
              className="mt-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
