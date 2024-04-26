/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { differenceInCalendarDays, format } from "date-fns";
import axios from "axios";
import { DepartmentChangeHistory } from "./DepartmentChangeHistory";
import { useState } from "react";

export const EmployeeDetail = () => {
  const { selectedEmployee, chooseEmployee } = useContext(EmployeeContext);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const employeeDepartment: {
    department: string;
    date: string;
  } = JSON.parse(selectedEmployee!.department) as {
    department: string;
    date: string;
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const dateFirstFormat = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = differenceInCalendarDays(end, start);
    const years = Math.floor(difference / 365);
    const months = Math.floor((difference % 365) / 30);
    const days = difference % 30;

    return `${years}y ${months}m ${days}d`;
  };

  const dateSecondFormat = (date: string) => {
    const dateObj = new Date(date);
    return format(dateObj, "MMM d, yyyy");
  };

  const updateEmployeeProperty = async (
    property: string,
    value: string | boolean
  ): Promise<void> => {
    try {
      if (selectedEmployee) {
        const updatedEmployee = { ...selectedEmployee, [property]: value };
        const response = await axios.put(
          `http://localhost:3001/employees/${selectedEmployee._id}`,
          updatedEmployee
        );
        if (response.status === 200) {
          chooseEmployee(updatedEmployee);
        }
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <>
      {selectedEmployee && (
        <div className="detail-section">
          <div className="medium-img-div">
            <img
              className="medium-img"
              src={`http://localhost:3001/uploads/${selectedEmployee.imageFilename}`}
              alt=""
            />
            <p
              className="hire-date"
              style={{
                background: selectedEmployee.isActive ? "none" : "orange",
                borderRadius: "4px",
                padding: ".5rem",
              }}
            >
              {selectedEmployee.isActive ? "" : "Inactive"}
            </p>
          </div>

          <div style={{ display: "flex" }}>
            <div className="left">
              <div>
                <p className="hire-date" style={{ marginBottom: "0px" }}>
                  {" "}
                  {selectedEmployee.firstName} - {selectedEmployee.lastName} (
                  {employeeDepartment.department})
                </p>
                <br />
                <h3 className="hire-date"> Hire Date</h3>
                <p className="hire-date">
                  {" "}
                  {dateSecondFormat(selectedEmployee.hireDate)}
                </p>
                <p className="hire-date">
                  {" "}
                  {dateFirstFormat(
                    selectedEmployee.hireDate,
                    new Date().toISOString()
                  )}
                </p>
              </div>
              <p>Update Department</p>
              <div
                className="update-dept-div"
                style={{ display: "inlineFlex", width: "max-content" }}
              >
                <select
                  className="department-select"
                  name=""
                  id=""
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Paws and Tails">Paws and Tails</option>
                </select>
                <button
                  onClick={() => {
                    const department = JSON.stringify({
                      department: selectedDepartment,
                      date: new Date().toISOString(),
                    });
                    updateEmployeeProperty("department", department);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="hire-date-div">
            <button
              className="set-status-button"
              style={{
                background: selectedEmployee.isActive
                  ? "orange"
                  : "yellowgreen",
              }}
              onClick={() =>
                updateEmployeeProperty("isActive", !selectedEmployee?.isActive)
              }
            >
              {selectedEmployee.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
          <div />
        </div>
      )}
      <button onClick={handleBack}>Go Back</button>
      <div>
        {selectedEmployee && (
          <DepartmentChangeHistory selectedEmployee={selectedEmployee} />
        )}
      </div>
    </>
  );
};
