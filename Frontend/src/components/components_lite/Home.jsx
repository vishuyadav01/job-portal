import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger fetch
  const jobs = useSelector((state) => state.job?.allJobs || []);
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Header />

      {/* Categories */}
      <section className="my-10">
        <Categories />
      </section>

      {/* Latest Jobs Section */}
      <section className="flex-1 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {loading && (
          <div className="flex justify-center my-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 my-10">
            Error loading jobs. Please try again.
          </p>
        )}

        {!loading && !error && <LatestJobs jobs={jobs} />}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
