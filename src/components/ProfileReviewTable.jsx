import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProfileReviewTable = ({ user }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Username</TableCell>
          <TableCell>{user.username}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Email</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">First Name</TableCell>
          <TableCell>{user.first_name || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Last Name</TableCell>
          <TableCell>{user.last_name || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bio</TableCell>
          <TableCell>{user.bio || 'N/A'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProfileReviewTable;
