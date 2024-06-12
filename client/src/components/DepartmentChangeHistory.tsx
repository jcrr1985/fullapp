/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import axios from "axios";
import { FormValues } from "../interfaces/Iemployees";
import { apiUrl } from "../contexts/EmployeeContext";

export const DepartmentChangeHistory = ({
  selectedEmployee,
}: {
  selectedEmployee: FormValues;
}) => {
  const [departmentHistory, setDepartmentHistory] = useState([]);

  useEffect(() => {
    const fetchDepartmentHistory = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/employees/${selectedEmployee._id}/department-history`
        );
        const departmentHistoryData = response.data;
        setDepartmentHistory(departmentHistoryData);
      } catch (error) {
        console.error("Error fetching department history:", error);
      }
    };

    fetchDepartmentHistory();
  }, [selectedEmployee]);

  return (
    <div>
      <h3>Department Change History</h3>
      <div className="department-history-table">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {departmentHistory.map((change: any, index: number) => (
              <tr key={index}>
                <td>{JSON.parse(change.department).department}</td>
                <td>{change.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
