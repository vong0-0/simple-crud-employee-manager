import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const app = express();
// Enable JSON parsing for incomming request
app.use(express.json());
app.use(cors());

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to employees.json file
const employeesPath = path.join(__dirname, "data", "employees.json");

// Read and send back the employees object
async function readJsonFile(filePath) {
  try {
    // Reads employees.json and decode as utf-8 string format
    const data = await fs.readFile(filePath, { encoding: "utf-8" });

    // Convert string data to JavaScript object and return it
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Update the data
async function writeJsonFile(filePath, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, json);
  } catch (error) {
    throw error;
  }
}

// Generate ID for new employee
function generateEmployeeId() {
  const prefix = "EMP";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumber}`;
}

// Get all employee data
app.get("/employees", async (req, res) => {
  try {
    const employees = await readJsonFile(employeesPath);

    // Send back employees data in JSON format
    res.status(200).json(employees);
  } catch (error) {
    // If reading or parsing employees.json fails
    console.error("Error loading employees.json: ", error);
    res.status(500).json({ error: "Failed to load employees" });
  }
});

// Create new employee
app.post("/employees", async (req, res) => {
  try {
    const employees = await readJsonFile(employeesPath);

    const { name, email, role, status } = req.body;
    const id = generateEmployeeId();

    const newEmployee = { id, name, email, role, status };
    employees.push(newEmployee);

    await writeJsonFile(employeesPath, employees);
    res.status(200).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(`Employee created failed: ${error}`);
    res.status(500).json({ error: "Employee created failed" });
  }
});

// Update the employee base on ID
app.put("/employees/:id", async (req, res) => {
  try {
    const employees = await readJsonFile(employeesPath);

    // Find employee to be updated
    const employee = employees.find((employee) => employee.id === req.body.id);

    employee.name = req.body.employeeName;
    employee.email = req.body.email;
    employee.role = req.body.role;
    employee.status = req.body.status;

    // Update the employees.json
    await writeJsonFile(employeesPath, employees);

    res
      .status(200)
      .json({ message: `Updating employee ID:${req.body.id} successfully` });
  } catch (error) {
    console.error(`Error updating employee ID:${req.body.id} :error`);
    res
      .status(500)
      .json({ error: `Failed to update employee ID:${req.body.id}` });
  }
});

// Delete the employee base on ID
app.delete("/employees/:id", async (req, res) => {
  try {
    const employees = await readJsonFile(employeesPath);

    // Find the index of the employee to be deleted
    const employeeIndex = employees.findIndex(
      (employee) => employee.id === req.params.id
    );

    // If not found
    if (employeeIndex === -1)
      return res.status(404).json({ error: "Employee not found" });

    // Deleted employee
    const deletedEmployee = employees.splice(employeeIndex, 1)[0];

    // Update the employees.json
    await writeJsonFile(employeesPath, employees);

    res.status(200).json({
      message: `Employee ID: ${req.params.id} deleted successfully`,
      deleted: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

// Listening in port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
