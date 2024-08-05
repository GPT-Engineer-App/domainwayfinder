import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare } from "lucide-react";

const DomainList = ({ domains }) => {
  if (!domains || domains.length === 0) {
    return <div className="text-center py-8">No domains found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain) => (
        <Link key={domain.id} to={`/domain/${domain.id}`} className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {domain.name}
                <Badge>{domain.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">{domain.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {domain.views || 0}
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-4 w-4" />
                {domain.perspectives || 0}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
