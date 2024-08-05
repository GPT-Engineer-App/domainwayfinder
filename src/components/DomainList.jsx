import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DomainList = ({ domains, onUpdateDomain, onDeleteDomain }) => {
  if (!domains || domains.length === 0) {
    return <div className="text-center py-8 text-lg text-muted-foreground">No domains found. Be the first to add one!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain) => (
        <Card key={domain.id} className="h-full flex flex-col hover:shadow-lg transition-shadow mb-4">
          <CardHeader>
            <div className="flex justify-between items-start">
              <Badge variant={getBadgeVariant(domain.type)}>{domain.type}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(domain.created_at).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="mt-2">{domain.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3">{domain.description}</CardDescription>
          </CardContent>
          <CardFooter className="mt-auto flex justify-end items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onUpdateDomain(domain.id, domain)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDeleteDomain(domain.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const getBadgeVariant = (type) => {
  switch (type) {
    case 'Trust':
      return 'default';
    case 'Knowledge':
      return 'secondary';
    case 'Tools':
      return 'outline';
    case 'Exchange':
      return 'destructive';
    default:
      return 'default';
  }
};

export default DomainList;
