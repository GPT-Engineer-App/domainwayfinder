import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateUser, addWorkHistory, addEducation, addCertification, addProject, addSkill, updateTrustScore, sendConnectionRequest, acceptConnectionRequest, updateUserPreferences, updateUserSocialConnections } from "../services/userService";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

const UserPage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, updates }) => updateUser(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      setIsEditing(false);
    },
  });

  const updateUserPreferencesMutation = useMutation({
    mutationFn: ({ id, preferences }) => updateUserPreferences(id, preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const updateUserSocialConnectionsMutation = useMutation({
    mutationFn: ({ id, connectionType, connections }) => updateUserSocialConnections(id, connectionType, connections),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const addWorkHistoryMutation = useMutation({
    mutationFn: (workHistory) => addWorkHistory(id, workHistory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const addEducationMutation = useMutation({
    mutationFn: (education) => addEducation(id, education),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const addCertificationMutation = useMutation({
    mutationFn: (certification) => addCertification(id, certification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const addProjectMutation = useMutation({
    mutationFn: (project) => addProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const addSkillMutation = useMutation({
    mutationFn: (skill) => addSkill(id, skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  if (isLoading) return <div className="text-center py-8">Loading user details...</div>;
  if (isError) return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-4">Error fetching user details. Please try again later.</p>
      <Button onClick={() => refetch()} className="bg-primary text-primary-foreground">
        Retry
      </Button>
    </div>
  );

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSaveClick = () => {
    updateUserMutation.mutate({ id: user.id, updates: editedUser });
  };

  const handleAddWorkHistory = (workHistory) => {
    addWorkHistoryMutation.mutate(workHistory);
  };

  const handleAddEducation = (education) => {
    addEducationMutation.mutate(education);
  };

  const handleAddCertification = (certification) => {
    addCertificationMutation.mutate(certification);
  };

  const handleAddProject = (project) => {
    addProjectMutation.mutate(project);
  };

  const handleAddSkill = (skill) => {
    addSkillMutation.mutate(skill);
  };

  const handleUpdatePreferences = (key, value) => {
    const newPreferences = { ...user.preferences, [key]: value };
    updateUserPreferencesMutation.mutate({ id: user.id, preferences: newPreferences });
  };

  const handleUpdateSocialConnections = (connectionType, connections) => {
    updateUserSocialConnectionsMutation.mutate({ id: user.id, connectionType, connections });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mt-8">
        <CardHeader>
          <h1 className="text-3xl font-bold">User Profile</h1>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="skills">Skills & Projects</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
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
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <Input
                      id="phone"
                      type="tel"
                      value={editedUser.phone_number}
                      onChange={(e) => setEditedUser({ ...editedUser, phone_number: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <Textarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-2"><strong>Username:</strong> {user.username}</p>
                  <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-2"><strong>Phone:</strong> {user.phone_number}</p>
                  <p className="mb-2"><strong>Bio:</strong> {user.bio}</p>
                  <p className="mb-2"><strong>Trust Score:</strong> {user.trust_score}</p>
                  {user.email_verified && <Badge>Verified Email</Badge>}
                  {user.phone_verified && <Badge>Verified Phone</Badge>}
                </>
              )}
            </TabsContent>
            <TabsContent value="professional">
              <h2 className="text-xl font-semibold mb-4">Work History</h2>
              {user.work_history.map((work, index) => (
                <div key={index} className="mb-4">
                  <p><strong>{work.company}</strong> - {work.position}</p>
                  <p>{work.start_date} - {work.end_date}</p>
                  <p>{work.description}</p>
                </div>
              ))}
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {user.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p><strong>{edu.institution}</strong> - {edu.degree}</p>
                  <p>{edu.start_date} - {edu.end_date}</p>
                </div>
              ))}
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              {user.certifications.map((cert, index) => (
                <div key={index} className="mb-4">
                  <p><strong>{cert.name}</strong> - {cert.issuer}</p>
                  <p>Issued: {cert.issue_date}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="skills">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills.map((skill, index) => (
                  <Badge key={index}>{skill.name}</Badge>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              {user.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p><strong>{project.name}</strong></p>
                  <p>{project.description}</p>
                  <p>Link: <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="network">
              <h2 className="text-xl font-semibold mb-4">Connections</h2>
              <p>Friends: {user.friends.length}</p>
              <p>Following: {user.following.length}</p>
              <p>Followers: {user.followers.length}</p>
            </TabsContent>
            <TabsContent value="preferences">
              <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <Switch
                    checked={user.preferences.darkMode}
                    onCheckedChange={(checked) => handleUpdatePreferences('darkMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Switch
                    checked={user.preferences.emailNotifications}
                    onCheckedChange={(checked) => handleUpdatePreferences('emailNotifications', checked)}
                  />
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                  <select
                    id="language"
                    value={user.preferences.language}
                    onChange={(e) => handleUpdatePreferences('language', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Switch
                    checked={user.two_factor_enabled}
                    onCheckedChange={(checked) => updateUserMutation.mutate({ id: user.id, updates: { two_factor_enabled: checked } })}
                  />
                </div>
                <Button onClick={() => {/* Implement password change logic */}}>
                  Change Password
                </Button>
                <p>Last Login: {new Date(user.last_login).toLocaleString()}</p>
              </div>
            </TabsContent>
          </Tabs>
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
