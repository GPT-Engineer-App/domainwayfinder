import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDomainById, updateDomain, deleteDomain, updatePerspective, deletePerspective } from "../services/domainService";
import PerspectiveList from "../components/PerspectiveList";
import AddPerspectiveForm from "../components/AddPerspectiveForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DomainDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDomain, setEditedDomain] = useState(null);

  const { data: domain, isLoading, isError } = useQuery({
    queryKey: ["domain", id],
    queryFn: () => fetchDomainById(id),
  });

  const updateDomainMutation = useMutation({
    mutationFn: ({ id, updates }) => updateDomain(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["domain", id]);
      setIsEditing(false);
    },
  });

  const deleteDomainMutation = useMutation({
    mutationFn: deleteDomain,
    onSuccess: () => {
      navigate("/");
    },
  });

  const updatePerspectiveMutation = useMutation({
    mutationFn: ({ id, updates }) => updatePerspective(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["domain", id]);
    },
  });

  const deletePerspectiveMutation = useMutation({
    mutationFn: deletePerspective,
    onSuccess: () => {
      queryClient.invalidateQueries(["domain", id]);
    },
  });

  if (isLoading) return <div>Loading domain details...</div>;
  if (isError) return <div>Error fetching domain details</div>;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDomain({ ...domain });
  };

  const handleSaveClick = () => {
    updateDomainMutation.mutate({ id: domain.id, updates: editedDomain });
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      deleteDomainMutation.mutate(domain.id);
    }
  };

  const handleUpdatePerspective = (perspectiveId, updates) => {
    updatePerspectiveMutation.mutate({ id: perspectiveId, updates });
  };

  const handleDeletePerspective = (perspectiveId) => {
    if (window.confirm("Are you sure you want to delete this perspective?")) {
      deletePerspectiveMutation.mutate(perspectiveId);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="mb-6">
          <Input
            value={editedDomain.name}
            onChange={(e) => setEditedDomain({ ...editedDomain, name: e.target.value })}
            className="text-3xl font-bold mb-2"
          />
          <Input
            value={editedDomain.type}
            onChange={(e) => setEditedDomain({ ...editedDomain, type: e.target.value })}
            className="mb-2"
          />
          <Textarea
            value={editedDomain.description}
            onChange={(e) => setEditedDomain({ ...editedDomain, description: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleSaveClick} className="mr-2">Save</Button>
          <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{domain.name}</h1>
          <p className="mb-2"><strong>Type:</strong> {domain.type}</p>
          <p className="mb-2"><strong>Description:</strong> {domain.description}</p>
          <Button onClick={handleEditClick} className="mr-2">Edit</Button>
          <Button onClick={handleDeleteClick} variant="destructive">Delete</Button>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Perspectives</h2>
      <PerspectiveList
        perspectives={domain.perspectives}
        onUpdatePerspective={handleUpdatePerspective}
        onDeletePerspective={handleDeletePerspective}
      />
      <AddPerspectiveForm domainId={id} />
    </div>
  );
};

export default DomainDetailsPage;
