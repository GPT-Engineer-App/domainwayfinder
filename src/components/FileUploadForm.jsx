import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { uploadFile } from "../integrations/supabase/index";

const FileUploadForm = ({ domainId, perspectiveId, onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const uploadedFiles = await Promise.all(files.map(async (file) => {
        const filePath = `${domainId}/${perspectiveId}/${file.name}`;
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

      await onFileUpload(uploadedFiles.filter(Boolean));
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="perspectiveFiles">Select Files</Label>
            <Input
              id="perspectiveFiles"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isUploading || files.length === 0}>
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FileUploadForm;
