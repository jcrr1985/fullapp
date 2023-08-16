import { useState, createContext, ReactNode } from 'react';

import { FormValues } from '../interfaces/Iemployees';

interface EmployeeContextType {
	selectedEmployee: FormValues | null;
	employeeListInCtx: FormValues[];
	chooseEmployee: (employee: FormValues) => void;
	clearChosenEmployee: () => void;
	SetEmployeeListInCtx: (employeeList: FormValues[]) => void;
}


export const EmployeeContext = createContext<EmployeeContextType>({
	selectedEmployee: null,
	employeeListInCtx: [],
	chooseEmployee: function (employee: FormValues): void {
		throw new Error('Function not implemented.');
	},
	clearChosenEmployee: function (): void {
		throw new Error('Function not implemented.');
	},
	SetEmployeeListInCtx: function (employeeList: FormValues[]): void {
		throw new Error('Function not implemented.');
	}
});


const EmployeeProvider = ({ children }: { children: ReactNode }) => {

	const [selectedEmployee, SetSelectedEmployee] = useState<FormValues | null>(null);
	const [employeeListInCtx, SetEmployeeListInCtx] = useState<FormValues[]>([]);


	const chooseEmployee = (employee: FormValues) => {
		SetSelectedEmployee(employee);
	}

	const clearChosenEmployee = () => {
		SetSelectedEmployee(null)
	}


	const employeeContextValue = {
		selectedEmployee, chooseEmployee, clearChosenEmployee, employeeListInCtx, SetEmployeeListInCtx
	}

	return (
		<EmployeeContext.Provider value={employeeContextValue}>
			{children}
		</EmployeeContext.Provider>
	)
}

export default EmployeeProvider;
