import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const filtered =
      companies?.filter((company) => {
        if (!searchCompanyByText) return true;
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      }) || [];

    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  if (!companies) return <p>Loading...</p>;

  /* ================= DESKTOP TABLE ================= */
  const DesktopTable = () => (
    <Table>
      <TableCaption>Your recent registered companies</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredCompanies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              No Companies Added
            </TableCell>
          </TableRow>
        ) : (
          filteredCompanies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt={company.name}
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {company.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <ActionMenu companyId={company._id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  /* ================= MOBILE CARDS ================= */
  const MobileCards = () => (
    <div className="space-y-4">
      {filteredCompanies.length === 0 ? (
        <p className="text-center text-gray-500">
          No Companies Added
        </p>
      ) : (
        filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt={company.name}
                  />
                </Avatar>

                <div>
                  <h3 className="font-semibold text-base">
                    {company.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {company.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>

              <ActionMenu companyId={company._id} />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <DesktopTable />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCards />
      </div>
    </div>
  );
};

/* ================= ACTION MENU ================= */
const ActionMenu = ({ companyId }) => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <MoreHorizontal />
      </PopoverTrigger>

      <PopoverContent className="w-32">
        <div
          onClick={() => navigate(`/admin/companies/${companyId}`)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Edit2 className="w-4" />
          <span>Edit</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CompaniesTable;
