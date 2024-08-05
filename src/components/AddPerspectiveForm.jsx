import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { uploadFile } from "../integrations/supabase";
import { useSupabaseAuth } from "../integrations/supabase/auth";

const AddPerspectiveForm = ({ domainId, onAddPerspective }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { session } = useSupabaseAuth();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploadedFiles = await Promise.all([...files].map(async (file) => {
      const filePath = `${domainId}/${name}/${file.name}`;
      const uploadedPath = await uploadFile(file, 'perspectives', filePath);

      if (!uploadedPath) {
        console.error('Error uploading file:', file.name);
        return null;
      }

      return {
        file_name: file.name,
        file_url: uploadedPath
      };
    }));

    onAddPerspective({ 
      name, 
      description, 
      files: uploadedFiles.filter(Boolean),
      createdBy: session?.user?.id
    });

    setName("");
    setDescription("");
    setFiles([]);
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
          <div className="space-y-2">
            <Label htmlFor="perspectiveFiles">Upload Files (optional)</Label>
            <Input
              id="perspectiveFiles"
              type="file"
              multiple
              onChange={handleFileChange}
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
