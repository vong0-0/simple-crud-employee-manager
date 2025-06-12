import EmployeeTable from "./ui/EmployeeTable";
import CreateForm from "./ui/CreateForm";
import { useState } from "react";

export default function App() {
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(true);
  return (
    <main className="bg-slate-200 w-full min-h-screen flex flex-col">
      <section className="flex flex-col gap-12 mt-24">
        <div className="max-w-[992px] w-11/12 mx-auto text-end">
          <button
            className="px-8 py-3 rounded-lg font-bold bg-blue-500 text-white border border-solid border-blue-500 hover:text-blue-500 hover:bg-transparent transition-colors duration-300"
            aria-label="Open create form"
            onClick={() => setOpenCreateForm(true)}
          >
            Create +
          </button>
        </div>

        {/* Create form */}
        <div
          className={`${
            openCreateForm ? "flex" : "hidden"
          } justify-center items-center fixed top-0 left-0 w-full h-screen bg-black/40`}
        >
          <CreateForm close={() => setOpenCreateForm(false)} />
        </div>
        <div className="max-w-[992px] w-11/12 mx-auto">
          <EmployeeTable />
        </div>
      </section>
    </main>
  );
}
