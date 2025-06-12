import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import { DeleteRecord } from "./buttons";
import EditForm from "./EditForm";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee>();
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );
  const tableHeaders: string[] = [
    "employee ID",
    "employee name",
    "email",
    "role",
    "status",
    "action",
  ];

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response: Response = await fetch(
          "http://localhost:3000/employees"
        );
        const employees: Employee[] = await response.json();
        setEmployees(employees || []);
      } catch (error) {
        console.error("Employees fetching is fails", error);
      }
    }

    fetchEmployees();
  }, [employees]);

  return (
    <div className="rounded-lg overflow-x-auto">
      {/* Header */}
      <div className="bg-white px-3 py-4">
        <h4 className="font-bold text-xl text-blue-800">Employee List</h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {employees.length ? (
          <table className="table w-full">
            <thead className="bg-transparent">
              <tr>
                {tableHeaders.map((tableHeader: string) => (
                  <th
                    key={tableHeader}
                    className="text-start capitalize font-bold px-3 py-4 text-zinc-700 text-nowrap"
                  >
                    {tableHeader}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white w-full">
              {employees.map((employee: Employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-solid border-slate-200"
                >
                  <td className="px-3 py-4 text-nowrap">{employee.id}</td>
                  <td className="px-3 py-4 text-nowrap capitalize">
                    {employee.name}
                  </td>
                  <td className="px-3 py-4 text-nowrap">{employee.email}</td>
                  <td className="px-3 py-4 text-nowrap capitalize">
                    {employee.role}
                  </td>
                  <td
                    aria-labelledby="employee-status"
                    className="px-3 py-4 text-nowrap"
                  >
                    <div
                      className={`${
                        (employee.status === "full-time" &&
                          "border-green-500") ||
                        (employee.status === "part-time" &&
                          "border-blue-400") ||
                        (employee.status === "freelance" && "border-orange-400")
                      } border border-solid py-2 px-2 rounded-lg flex justify-center items-center gap-4`}
                    >
                      <div
                        className={`${
                          (employee.status === "full-time" && "bg-green-500") ||
                          (employee.status === "part-time" && "bg-blue-400") ||
                          (employee.status === "freelance" && "bg-orange-400")
                        } w-[6px] h-[6px] rounded-full`}
                      ></div>
                      <p
                        id="employee-status"
                        className={`${
                          (employee.status === "full-time" &&
                            "text-green-500") ||
                          (employee.status === "part-time" &&
                            "text-blue-400") ||
                          (employee.status === "freelance" && "text-orange-400")
                        } capitalize font-medium`}
                      >
                        {employee.status}
                      </p>
                    </div>
                  </td>
                  <td className="flex items-center justify-center gap-2 px-3 py-4">
                    <button
                      onClick={() => {
                        setEditingEmployeeId(employee.id);
                        setEditingEmployee(employee);
                      }}
                      className="bg-zinc-100 px-2 py-2 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300"
                      aria-label={`Edit ${employee.name} Record`}
                    >
                      <Pen size={15} />
                    </button>
                    <DeleteRecord
                      id={employee.id}
                      employeeName={employee.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-bold italic text-center mt-8 text-lg">No record</p>
        )}
      </div>

      {/* Edit form */}
      {editingEmployee?.id === editingEmployeeId && (
        <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-black/40">
          <EditForm
            employee={editingEmployee}
            close={() => setEditingEmployeeId(null)}
          />
        </div>
      )}
    </div>
  );
}
