import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "Machine",
    status: "Active",
    lastCleanedDate: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/equipment");
    const data = await res.json();
    setEquipment(data);
  };

  const addEquipment = async () => {
    if (!form.name) {
      alert("Name is required");
      return;
    }

    await fetch("http://localhost:5000/api/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", type: "Machine", status: "Active", lastCleanedDate: "" });
    loadData();
  };

  const deleteEquipment = async (id) => {
    await fetch(`http://localhost:5000/api/equipment/${id}`, {
      method: "DELETE"
    });
    loadData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Equipment Tracker</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <select onChange={e => setForm({ ...form, type: e.target.value })}>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select onChange={e => setForm({ ...form, status: e.target.value })}>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        value={form.lastCleanedDate}
        onChange={e => setForm({ ...form, lastCleanedDate: e.target.value })}
      />

      <button onClick={addEquipment}>Add</button>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.type}</td>
              <td>{e.status}</td>
              <td>{e.lastCleanedDate}</td>
              <td>
                <button onClick={() => deleteEquipment(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
