import { useState } from "react";
import { supabase } from "../services/supabaseClient";

const ContactForm = () => {
  const [deptName, setDeptName] = useState("");
  const [deptType, setDeptType] = useState("government");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("department_requests").insert([
      {
        dept_name: deptName,
        dept_type: deptType,
        contact_person: contactPerson,
        email,
        phone,
      },
    ]);

    if (error) {
      setMessage("Error submitting request. Please try again.");
    } else {
      setMessage("Your request has been submitted successfully!");
      setDeptName("");
      setContactPerson("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
        Department Registration Request
      </h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Department Name"
          className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
          required
        />
        <select
          className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
          value={deptType}
          onChange={(e) => setDeptType(e.target.value)}
        >
          <option value="government">Government</option>
          <option value="ngo">NGO</option>
          <option value="transport">Transport</option>
        </select>
        <input
          type="text"
          placeholder="Contact Person"
          className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
