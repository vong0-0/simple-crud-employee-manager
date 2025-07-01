import axios from "axios";
import { useState, type ReactNode } from "react";

interface Employee {
  fname: string;
  lname: string;
  email: string;
  role: string;
  status: string;
}

export default function CreateForm({ close }: { close: () => void }) {
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("fname") + " " + formData.get("lname");
    const email = formData.get("email");
    const role = formData.get("role");
    const status = formData.get("status");

    const newEmployee = {
      name: name,
      email: email,
      role: role,
      status: status,
    };

    const response = await axios.post(
      "http://localhost:3000/employees",
      newEmployee
    );
    console.log(response);

    close();
  }

  return (
    <form
      aria-label={`Create a employee form`}
      onSubmit={handleCreate}
      className="max-w-[600px] w-11/12 mx-auto bg-white px-6 py-12 rounded-lg"
    >
      <h2 className="mb-8 font-bold text-4xl">Create Employee</h2>
      <div className="flex flex-col gap-4">
        {/* First name and Last name */}
        <div className="w-full grid grid-cols-2 gap-4">
          {/* First name */}
          <InputGroup>
            <label htmlFor="fname" className="edit-input-label">
              First name
            </label>
            <input
              id="fname"
              type="text"
              name="fname"
              className="edit-input-field"
              placeholder="First name"
            />
          </InputGroup>

          {/* Last name */}
          <InputGroup>
            <label htmlFor="lname" className="edit-input-label">
              Last name
            </label>
            <input
              id="lname"
              type="text"
              name="lname"
              className="edit-input-field"
              placeholder="Last name"
            />
          </InputGroup>
        </div>

        {/* Email */}
        <InputGroup>
          <label htmlFor="lname" className="edit-input-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="edit-input-field"
            placeholder="example@gmail.com"
          />
        </InputGroup>

        {/* Role */}
        <InputGroup>
          <label htmlFor="roles" className="edit-input-label">
            Role
          </label>
          <select name="role" id="roles" className="edit-input-field">
            <option value="" disabled>
              Role
            </option>
            <option value="UI/UX designer">UI/UX Designer</option>
            <option value="frontend developer">Frontend Developer</option>
            <option value="backend developer">Backend Developer</option>
            <option value="project manager">Project Manager</option>
            <option value="QA engineer">QA Engineer</option>
            <option value="DevOps engineer">DevOps Engineer</option>
            <option value="product owner">Product Owner</option>
            <option value="data analyst">Data Analyst</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="status" className="edit-input-label">
            Status
          </label>
          <select name="status" id="status" className="edit-input-field">
            <option value="" disabled>
              Status
            </option>
            <option value="full-time">Full-time</option>
            <option value="freelance">Freelance</option>
            <option value="part-time">Part-time</option>
          </select>
        </InputGroup>
      </div>

      {/* Action buttons */}
      <div className="mt-12 flex items-center justify-end gap-6">
        <button
          aria-label="Cancel and close edit form"
          type="button"
          onClick={close}
          className="font-bold py-2 px-4 border border-solid border-red-500 rounded-lg"
        >
          Cancel
        </button>
        <button
          aria-label="Cancel and close edit form"
          type="submit"
          className="font-bold py-2 px-4 border border-solid border-green-500 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function InputGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
