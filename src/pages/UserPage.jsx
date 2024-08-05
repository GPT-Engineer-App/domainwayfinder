import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUser, updateUser } from "../services/userService";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const UserPage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, updates }) => updateUser(id, updates),
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  if (isLoading) return <div className="text-center py-8">Loading user details...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching user details</div>;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSaveClick = () => {
    updateUserMutation.mutate({ id: user.id, updates: editedUser });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mt-8">
        <CardHeader>
          <h1 className="text-3xl font-bold">User Profile</h1>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <Input
                  id="username"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <p className="mb-2"><strong>Username:</strong> {user.username}</p>
              <p className="mb-2"><strong>Email:</strong> {user.email}</p>
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
            <Button onClick={handleEditClick}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserPage;
