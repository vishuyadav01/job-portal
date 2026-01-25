import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Explore our extensive job market.
        </p>
      </div>

      {/* Carousel */}
      <Carousel className="w-full max-w-5xl mx-auto my-10">
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
            >
              <Button
                onClick={() => searchjobHandler(category)}
                className="w-full py-4 text-sm sm:text-base text-center whitespace-normal"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Hide arrows on very small screens */}
        <div className="hidden sm:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default Categories;
