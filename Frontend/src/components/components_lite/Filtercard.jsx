import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
      "Desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-md p-4 sm:p-5">
      <h1 className="font-bold text-lg mb-2">Filter Jobs</h1>
      <hr className="mb-4" />

      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="space-y-6"
      >
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-semibold text-base sm:text-lg mb-3">
              {data.filterType}
            </h2>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {data.array.map((item, indx) => {
                const itemId = `filter-${index}-${indx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className="flex items-center gap-3 cursor-pointer text-sm sm:text-base"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
