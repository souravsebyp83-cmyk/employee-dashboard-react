import React from 'react';
import { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Users, Mail, Search, Plus, House, UserRound, ArrowRight, MapPin, BriefcaseBusiness, IndianRupee } from "lucide-react";

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">P</span><span>PeopleDesk</span>
      </NavLink>
      <div className="nav-links">
        <NavLink end to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><House size={17} /> Home</NavLink>
        <NavLink to="/employee-form" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><Plus size={17} /> Employee Form</NavLink>
      </div>
      <div className="profile"><span className="profile-avatar">AD</span><span>Admin Workspace</span></div>
    </nav>
  );
}

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (!response.ok) throw new Error("Could not load employee data.");
        return response.json();
      })
      .then(data => setEmployees(data))
      .catch(() => setError("We couldn't load the employee list. Please check your internet connection and try again."))
      .finally(() => setLoading(false));
  }, []);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query)
    );
  }, [employees, search]);

  return (
    <main className="main">
      <div className="heading-row">
        <div><div className="eyebrow">PEOPLE OVERVIEW</div><h1>Employee Dashboard</h1><p className="subtitle">A clear view of your people, all in one place.</p></div>
        <NavLink className="primary-button" to="/employee-form"><Plus size={18} /> Add Employee</NavLink>
      </div>
      <section className="stats">
        <article className="stat-card"><span className="stat-icon"><Users /></span><div><p>Employees listed</p><strong>{employees.length}</strong></div></article>
        <article className="stat-card"><span className="stat-icon"><Mail /></span><div><p>Email contacts</p><strong>{employees.filter(employee => employee.email).length}</strong></div></article>
        <article className="stat-card"><span className="stat-icon"><Search /></span><div><p>Directory status</p><strong className="status-text">{loading ? "Loading…" : error ? "Unavailable" : "Up to date"}</strong></div></article>
      </section>
      <section className="panel">
        <div className="panel-heading">
          <div><h2>Employee directory</h2><p>Browse employee names and contact details</p></div>
          <label className="search-box"><Search size={17} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name or email…" /></label>
        </div>
        {loading ? <div className="message"><span className="spinner" /> Loading employees from API…</div> :
          error ? <div className="message error-message">{error}</div> :
          filteredEmployees.length === 0 ? <div className="message">No employees match your search.</div> :
          <div className="table-wrap"><table><thead><tr><th>ID</th><th>Employee name</th><th>Email address</th><th>Status</th></tr></thead>
            <tbody>{filteredEmployees.map(employee => <tr key={employee.id}>
              <td className="id-cell">{String(employee.id).padStart(2, "0")}</td>
              <td><div className="person"><span className="person-avatar">{initials(employee.name)}</span><strong>{employee.name}</strong></div></td>
              <td className="email-cell">{employee.email}</td><td><span className="pill">Active</span></td>
            </tr>)}</tbody></table></div>}
        <div className="panel-footer"><span>Showing {filteredEmployees.length} of {employees.length} employees</span><span>Source: JSONPlaceholder API</span></div>
      </section>
    </main>
  );
}

function EmployeeForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", designation: "", location: "", salary: "" });
  const [message, setMessage] = useState("");
  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }
  function submit(event) {
    event.preventDefault();
    // The assignment specifically says not to POST data to an API.
    setMessage(`Form validated for ${form.name}. No data was sent to a server.`);
  }
  return (
    <main className="main">
      <div className="heading-row"><div><div className="eyebrow">PEOPLE MANAGEMENT</div><h1>Employee Form</h1><p className="subtitle">Enter employee details in the form below.</p></div></div>
      <section className="panel form-panel">
        <div className="form-heading"><h2>Employee information</h2><p>Fields marked with * are required.</p></div>
        <form onSubmit={submit} className="employee-form">
          <div className="form-field"><label htmlFor="name">Name *</label><input id="name" name="name" value={form.name} onChange={update} placeholder="e.g. Alex Johnson" required /></div>
          <div className="form-field"><label htmlFor="designation">Designation *</label><span className="input-icon"><BriefcaseBusiness size={17} /><input id="designation" name="designation" value={form.designation} onChange={update} placeholder="e.g. Software Engineer" required /></span></div>
          <div className="form-field"><label htmlFor="location">Location *</label><span className="input-icon"><MapPin size={17} /><input id="location" name="location" value={form.location} onChange={update} placeholder="e.g. Kochi" required /></span></div>
          <div className="form-field"><label htmlFor="salary">Salary (₹) *</label><span className="input-icon"><IndianRupee size={17} /><input id="salary" name="salary" type="number" min="0" step="1" value={form.salary} onChange={update} placeholder="e.g. 45000" required /></span></div>
          <div className="form-actions"><button type="button" className="secondary-button" onClick={() => navigate("/")}>Cancel</button><button type="submit" className="primary-button">Save details <ArrowRight size={17} /></button></div>
        </form>
        {message && <div className="form-notice" role="status">{message}</div>}
        <div className="assignment-note">Assignment note: this form validates the required fields in the browser. It does not POST data to an API.</div>
      </section>
    </main>
  );
}

export default function App() {
  return <div className="app-shell"><Navbar /><Routes><Route path="/" element={<Dashboard />} /><Route path="/employee-form" element={<EmployeeForm />} /><Route path="*" element={<Dashboard />} /></Routes></div>;
}
