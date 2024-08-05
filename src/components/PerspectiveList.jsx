import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFileUrl } from "../integrations/supabase/index";

const PerspectiveList = ({ perspectives, onUpdatePerspective, onDeletePerspective }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedPerspective, setEditedPerspective] = useState(null);

  const handleEditClick = (perspective) => {
    setEditingId(perspective.id);
    setEditedPerspective({ ...perspective });
  };

  const handleSaveClick = () => {
    onUpdatePerspective(editingId, editedPerspective);
    setEditingId(null);
  };

  return (
    <div className="mb-6">
      {perspectives.map((perspective) => (
        <div key={perspective.id} className="mb-4 p-4 border rounded-lg">
          {editingId === perspective.id ? (
            <>
              <Input
                value={editedPerspective.name}
                onChange={(e) => setEditedPerspective({ ...editedPerspective, name: e.target.value })}
                className="mb-2"
              />
              <Textarea
                value={editedPerspective.description}
                onChange={(e) => setEditedPerspective({ ...editedPerspective, description: e.target.value })}
                className="mb-2"
              />
              <Button onClick={handleSaveClick} className="mr-2">Save</Button>
              <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">{perspective.name}</h3>
              <p className="mb-2">{perspective.description}</p>
              <Button onClick={() => handleEditClick(perspective)} className="mr-2">Edit</Button>
              <Button onClick={() => onDeletePerspective(perspective.id)} variant="destructive">Delete</Button>
              {perspective.files && perspective.files.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold">Files:</h4>
                  <ul>
                    {perspective.files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={getFileUrl('perspectives', file.file_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {file.file_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PerspectiveList;
