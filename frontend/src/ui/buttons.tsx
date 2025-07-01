import axios from "axios";
import { Trash } from "lucide-react";

export function DeleteRecord({
  id,
  employeeName,
}: {
  id: string;
  employeeName: string;
}) {
  async function handleDeleteRecord() {
    const response = await axios.delete(
      `http://localhost:3000/employees/${id}`
    );
    console.log(response.data);
  }
  return (
    <button
      onClick={handleDeleteRecord}
      className="bg-zinc-100 px-2 py-2 rounded-lg shadow-md hover:bg-red-200 transition-colors duration-300"
      aria-label={`Delete ${employeeName} Record`}
    >
      <Trash size={15} />
    </button>
  );
}
