import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
        <h1 className="font-bold text-lg sm:text-xl mb-4">
          Applicants{" "}
          <span className="text-gray-500">
            ({applicants?.applications?.length || 0})
          </span>
        </h1>

        {/* Applicants Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
