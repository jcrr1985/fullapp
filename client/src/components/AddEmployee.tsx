/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
  };

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
        formData.append("image", selectedImage);
      }
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("hireDate", data.hireDate);
      formData.append(
        "department",
        JSON.stringify({
          department: data.department,
          date: new Date().toISOString(),
        })
      );
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      const response = await fetch("http://localhost:3001/employees", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const createdEmployee = await response.json();
        try {
          await fetchEmployees();
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
        reset();
      } else {
        console.log("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <input
            placeholder="First Name"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="firstName"
            {...register("firstName", {
              validate: (value) => {
                if (!value) {
                  return "First Name is required";
                }
                if (!/^[A-Za-z\s]+$/i.test(value)) {
                  return "Only letters and spaces allowed";
                }
                return true;
              },
            })}
          />
          <p>{errors.firstName && errors.firstName.message}</p>
        </div>

        <div>
          <input
            placeholder="Second Name"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="lastName"
            {...register("lastName", {
              validate: (value) => {
                if (!value) {
                  return "Last Name is required";
                }
                if (!/^[A-Za-z\s]+$/i.test(value)) {
                  return "Only letters and spaces allowed";
                }
                return true;
              },
            })}
          />
          <p>{errors.lastName && errors.lastName.message}</p>
        </div>

        <div>
          <input
            placeholder="yyyy-mm-dd"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="hireDate"
            {...register("hireDate", {
              required: "Hire Date is required",
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Date must be in the format "YYYY-mm-dd"',
              },
            })}
          />
          <p>{errors.hireDate && errors.hireDate.message}</p>
        </div>

        <div>
          <input
            placeholder="Department"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="department"
            {...register("department", {
              validate: (value) => {
                if (!value) {
                  return "Department is required";
                }
                return true;
              },
            })}
          />
          <p>
            <span className="text-red-600">
              {errors.department && errors.department.message}
            </span>
          </p>
        </div>

        <div>
          <input
            placeholder="Phone"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="phone"
            {...register("phone", {
              validate: (value) => {
                if (!value) {
                  return "Last Name is required";
                }
                if (!/^\d+$/.test(value)) {
                  return "Only numbers allowed";
                }
                return true;
              },
            })}
          />
          <p>{errors.phone && errors.phone.message}</p>
        </div>

        <div>
          <input
            placeholder="Address"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            id="address"
            {...register("address", {
              required: true,
              minLength: 2,
            })}
          />
          <p>{errors.address && errors.address.message}</p>
        </div>

        <div>
          <input
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
