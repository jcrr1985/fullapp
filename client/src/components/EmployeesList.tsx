/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";
import axios from "axios";
import { FormValues } from "../interfaces/Iemployees";
import { AddEmployee } from "./AddEmployee";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext, apiUrl } from "../contexts/EmployeeContext";

import { EmployeeContextType } from "../interfaces/IemployeeContextType";

export const EmployeesList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<FormValues[]>([]);

  const { chooseEmployee } = useContext(EmployeeContext) as EmployeeContextType;

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employees`);
      console.log("response", response);
      const employeesFetched: FormValues[] = response.data;
      setEmployees(employeesFetched);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleViewDetails = (employee: FormValues) => {
    chooseEmployee(employee);
    const id = employee._id;
    navigate(`/employee/:${id}`);
  };

  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(
        `https://full-app-server.onrender.com/employees/${id}`
      );
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <AddEmployee fetchEmployees={fetchEmployees} />
      <div className="flex justify-center flex-wrap gap-6">
        {employees.map((employee) => (
          <div
            style={{
              width: employees.length > 2 ? "30%" : "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-5 flex flex-col justify-around"
            key={employee._id}
          >
            <div
              className={`h-3 w-3 rounded-full ${
                employee.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <img
              className="thumbnail w-full object-cover object-center"
              src={`https://full-app-server.onrender.com/uploads/${employee.imageFilename}`}
              alt=""
            />
            <h4 className="text-gray-900 font-bold text-2xl my-4">
              {employee.firstName} {employee.lastName} -
              {parseDepartment(employee.department)}
            </h4>
            <div className="flex justify-between items-center text-gray-600">
              <p>Hire Date:</p>
              <p>{new Date(employee.hireDate).toLocaleDateString("en-CA")}</p>
            </div>
            <div className="flex justify-between items-center mt-4 gap-1">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                onClick={() => handleViewDetails(employee)}
              >
                View Details
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                onClick={() => {
                  deleteEmployee(employee._id).catch((error) => {
                    console.error("Error deleting employee:", error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DepartmentData {
  department: string;
  date: string;
}

function parseDepartment(departmentData: string): string {
  try {
    const parsed = JSON.parse(departmentData) as DepartmentData;
    return parsed.department || "Unknown";
  } catch (error) {
    console.error("Error parsing department data:", error);
    return "Unknown";
  }
}
