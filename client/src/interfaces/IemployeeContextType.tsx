import { FormValues } from './Iemployees';

export interface EmployeeContextType {
	selectedEmployee: FormValues | null;
	chooseEmployee: (employee: FormValues) => void;
	clearChosenEmployee: () => void;
}