/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormValues } from '../interfaces/Iemployees';
import { AddEmployee } from './AddEmployee';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext';

import { EmployeeContextType } from '../interfaces/IemployeeContextType';

export const EmployeesList = () => {
	const navigate = useNavigate();

	const [employees, setEmployees] = useState<FormValues[]>([]);

	const { selectedEmployee, chooseEmployee, clearChosenEmployee } = useContext(EmployeeContext) as EmployeeContextType;

	const fetchEmployees = async () => {
		try {
			const response = await axios.get('http://localhost:3000/employees');
			const employeesFetched: FormValues[] = response.data;
			console.log('employeesFetched', employeesFetched)
			setEmployees(employeesFetched)
		} catch (error) {
			console.error('Error fetching employees:', error);
		}
	};
	useEffect(() => {
		fetchEmployees();
	}, []);

	const handleViewDetails = (employee: FormValues) => {
		chooseEmployee(employee);
		const id = employee._id;
		navigate(`/employee/:${id}`);
	}

	const deleteEmployee = async (id: string) => {
		try {
			await axios.delete(`http://localhost:3000/employees/${id}`);
			fetchEmployees();
		} catch (error) {
			console.error('Error deleting employee:', error);
		}
	};

	return (
		<div>
			<AddEmployee fetchEmployees={fetchEmployees} />
			<br />
			<div className="card-grid">
				{employees.map((employee) => (
					< div className="card" key={employee._id}>
						<div className='status-indicator' style={{ background: employee.isActive ? 'yellowgreen' : '#ff6666' }}></div>
						<img className='thumbnail' src={`http://localhost:3000/uploads/${employee.imageFilename}`} alt="" />
						<h4 style={{ marginBottom: '0px' }}> {employee.firstName} - {employee.lastName} (IT)</h4>
						<div style={{ marginBottom: '15px' }}>
							<p className='hire-date'>Hire Date</p>
							<p className='hire-date'>2021-12-07</p>
						</div>
						<div className='btn-container'>
							<button className='view-details-btn btn'
								onClick={() => handleViewDetails(employee)}>
								View Details
							</button>
							<button className='delete-btn btn'
								onClick={() => {
									deleteEmployee(employee._id).catch(error => {
										console.error('Error deleting employee:', error);
									});
								}}>
								Delete
							</button>
						</div>
						<div />
					</div >
				))}
			</div >
		</div>
	)
}