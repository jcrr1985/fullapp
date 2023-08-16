export type FormValues = {
	_id: string;
	firstName: string;
	lastName: string;
	hireDate: string;
	department: string;
	phone: string;
	address: string;
	isActive: boolean;
	imageFilename: string;
	departmentHistory: DepartmentHistory[];
}

export type DepartmentHistory = {
	department: string;
	date: string;
}
