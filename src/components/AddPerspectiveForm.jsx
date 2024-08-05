import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPerspective } from "../services/domainService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Add New Perspective</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="perspectiveName">Name</Label>
            <Input
              id="perspectiveName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="perspectiveDescription">Description</Label>
            <Textarea
              id="perspectiveDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Perspective</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPerspectiveForm;
