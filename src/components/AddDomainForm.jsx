import { useState } from "react";

const AddDomainForm = ({ onAddDomain, onCancel }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDomain({ name, type, description });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Domain</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block mb-1">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a type</option>
          <option value="Trust">Trust</option>
          <option value="Knowledge">Knowledge</option>
          <option value="Tools">Tools</option>
          <option value="Exchange">Exchange</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 border rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">Add Domain</button>
      </div>
    </form>
  );
};

export default AddDomainForm;
