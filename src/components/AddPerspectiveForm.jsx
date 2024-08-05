import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useSupabaseAuth } from "../integrations/supabase/auth";
import FileUploadForm from "./FileUploadForm";

const AddPerspectiveForm = ({ domainId, onAddPerspective }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSupabaseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onAddPerspective({ 
        name, 
        description, 
        createdBy: session?.user?.id
      });

      setName("");
      setDescription("");
    } catch (error) {
      console.error('Error adding perspective:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Perspective"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPerspectiveForm;
