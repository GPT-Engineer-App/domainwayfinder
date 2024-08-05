import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "../integrations/supabase";

const AddPerspectiveForm = ({ domainId, onAddPerspective }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploadedFiles = await Promise.all([...files].map(async (file) => {
      const { data, error } = await supabase.storage
        .from('perspectives')
        .upload(`${domainId}/${name}/${file.name}`, file);

      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }

      return {
        file_name: file.name,
        file_url: data.path
      };
    }));

    onAddPerspective({ 
      name, 
      description, 
      files: uploadedFiles.filter(Boolean)
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
