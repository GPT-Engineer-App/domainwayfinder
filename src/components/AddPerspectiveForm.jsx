import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPerspective } from "../services/domainService";

const AddPerspectiveForm = ({ domainId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPerspective,
    onSuccess: () => {
      queryClient.invalidateQueries(["domain", domainId]);
      setName("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ domainId, name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg">
      <h3 className="text-xl font-bold mb-4">Add New Perspective</h3>
      <div className="mb-4">
        <label htmlFor="perspectiveName" className="block mb-1">Name:</label>
        <input
          type="text"
          id="perspectiveName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="perspectiveDescription" className="block mb-1">Description:</label>
        <textarea
          id="perspectiveDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">
        Add Perspective
      </button>
    </form>
  );
};

export default AddPerspectiveForm;
