import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DomainList = ({ domains }) => {
  if (!domains || domains.length === 0) {
    return <div className="text-center py-8 text-lg text-muted-foreground">No domains found. Be the first to add one!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain) => (
        <Card key={domain.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
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
          <CardFooter className="mt-auto flex justify-between items-center">
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {domain.views || 0}
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-4 w-4" />
                {domain.perspectives || 0}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/domain/${domain.id}`}>
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
