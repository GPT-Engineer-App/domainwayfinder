import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDomainById, updateDomain, deleteDomain, updatePerspective, deletePerspective, incrementDomainViews } from "../services/domainService";
import PerspectiveList from "../components/PerspectiveList";
import AddPerspectiveForm from "../components/AddPerspectiveForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, MessageSquare, Calendar } from "lucide-react";

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

  useEffect(() => {
    if (domain) {
      incrementDomainViews(id);
    }
  }, [domain, id]);

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

  if (isLoading) return <div className="text-center py-8">Loading domain details...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching domain details</div>;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDomain({ ...domain });
  };

  const handleSaveClick = () => {
    updateDomainMutation.mutate({ id: domain.id, updates: editedDomain });
  };

  const handleDeleteClick = () => {
    deleteDomainMutation.mutate(domain.id);
  };

  const handleUpdatePerspective = (perspectiveId, updates) => {
    updatePerspectiveMutation.mutate({ id: perspectiveId, updates });
  };

  const handleDeletePerspective = (perspectiveId) => {
    deletePerspectiveMutation.mutate(perspectiveId);
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          {isEditing ? (
            <Input
              value={editedDomain.name}
              onChange={(e) => setEditedDomain({ ...editedDomain, name: e.target.value })}
              className="text-3xl font-bold mb-2"
            />
          ) : (
            <h1 className="text-3xl font-bold">{domain.name}</h1>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Input
                value={editedDomain.type}
                onChange={(e) => setEditedDomain({ ...editedDomain, type: e.target.value })}
                className="mb-2"
                placeholder="Domain Type"
              />
              <Textarea
                value={editedDomain.description}
                onChange={(e) => setEditedDomain({ ...editedDomain, description: e.target.value })}
                className="mb-2"
                placeholder="Domain Description"
              />
            </>
          ) : (
            <>
              <p className="mb-2"><strong>Type:</strong> {domain.type}</p>
              <p className="mb-2"><strong>Description:</strong> {domain.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {domain.views} views
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {domain.perspectives?.length} perspectives
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {new Date(domain.created_at).toLocaleDateString()}
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <>
              <Button onClick={handleSaveClick} className="mr-2">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={handleEditClick} className="mr-2">Edit</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the domain and all its perspectives.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </CardFooter>
      </Card>
      <Tabs defaultValue="perspectives" className="w-full">
        <TabsList>
          <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="perspectives">
          <h2 className="text-2xl font-bold mb-4">Perspectives</h2>
          <PerspectiveList
            perspectives={domain.perspectives}
            onUpdatePerspective={handleUpdatePerspective}
            onDeletePerspective={handleDeletePerspective}
          />
          <AddPerspectiveForm domainId={id} />
        </TabsContent>
        <TabsContent value="analytics">
          <h2 className="text-2xl font-bold mb-4">Domain Analytics</h2>
          {/* Add analytics components here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DomainDetailsPage;
