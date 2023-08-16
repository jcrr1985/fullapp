/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddEmployeeProps {
	fetchEmployees: () => Promise<void>;
}

export const AddEmployee = ({ fetchEmployees }: AddEmployeeProps) => {

	type FormValues = {
		firstName: string;
		lastName: string;
		hireDate: string;
		department: string;
		phone: string;
		address: string;
	}

	const { register, handleSubmit, formState, reset } = useForm<FormValues>();

	const { errors } = formState;

	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedImage(event.target.files[0]);
		}
	};

	const onSubmit = async (data: FormValues) => {
		try {
			const formData = new FormData();
			if (selectedImage) {
				formData.append('image', selectedImage);
			}
			formData.append('firstName', data.firstName);
			formData.append('lastName', data.lastName);
			formData.append('hireDate', data.hireDate);
			formData.append('department', JSON.stringify({ department: data.department, date: new Date().toISOString() }));
			formData.append('phone', data.phone);
			formData.append('address', data.address);

			const response = await fetch('http://localhost:3000/employees', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const createdEmployee = await response.json();
				try {
					await fetchEmployees();
				} catch (error) {
					console.error('Error fetching employees:', error);
				}
				reset();
			} else {
				console.log('Failed to create employee');
			}
		} catch (error) {
			console.error('Error creating employee:', error);
		}
	}

	return (
		<>
			<fieldset style={{ border: '1px solid #c8bce9', borderRadius: '5px', padding: '10px' }}>
				<legend>Add New Employee</legend>
				<form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)} noValidate>

					<div className='form-wrapper'>
						<div className='addEmployee-input'>
							<input placeholder='First Name' className='form-input' type='text' id='firstName' {...register("firstName", {
								validate: (value) => {
									if (!value) {
										return 'First Name is required';
									}
									if (!/^[A-Za-z\s]+$/i.test(value)) {
										return 'Only letters and spaces allowed';
									}
									return true;
								},
							})} />
							<p>{errors.firstName && errors.firstName.message}</p>
						</div>

						<div className='addEmployee-input'>

							<input placeholder='Second Name' className='form-input' type='text' id='lastName' {...register("lastName", {
								validate: (value) => {
									if (!value) {
										return 'Last Name is required';
									}
									if (!/^[A-Za-z\s]+$/i.test(value)) {
										return 'Only letters and spaces allowed';
									}
									return true;
								},
							})} />
							<p>{errors.lastName && errors.lastName.message}</p>
						</div>

						<div className='addEmployee-input'>
							<input
								placeholder='yyyy-mm-dd'
								className='form-input'
								type='text'
								id='hireDate'
								{...register('hireDate', {
									required: 'Hire Date is required',
									pattern: {
										value: /^\d{4}-\d{2}-\d{2}$/,
										message: 'Date must be in the format "YYYY-mm-dd"',
									},
								})}
							/>
							<p>{errors.hireDate && errors.hireDate.message}</p>
						</div>

						<div className='addEmployee-input'>
							<input placeholder='Department' className='form-input' type='text' id='department' {...register("department", {
								validate: (value) => {
									if (!value) {
										return 'Department is required';
									}
									return true;
								},
							})} />
							<p>{errors.department && errors.department.message}</p>
						</div>

						<div className='addEmployee-input'>
							<input placeholder='Phone' className='form-input' type='text' id='phone' {...register("phone", {
								validate: (value) => {
									if (!value) {
										return 'Last Name is required';
									}
									if (!/^\d+$/.test(value)) {
										return 'Only numbers allowed';
									}
									return true;
								}
							})} />
							<p>{errors.phone && errors.phone.message}</p>
						</div>

						<div className='addEmployee-input'>
							<input placeholder='Address' className='form-input' type='text' id='address' {...register("address", {
								required: true,
								minLength: 2,
							})} />
							<p>{errors.address && errors.address.message}</p>
						</div>

						<div className='addEmployee-input'>
							<input
								className='form-input'
								type='file'
								id='image'
								onChange={handleImageChange}
							/>
						</div>
					</div>
					<button>Submit</button>

				</form>
			</fieldset>
		</>
	)
}
