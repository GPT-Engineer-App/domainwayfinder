import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DomainList = ({ domains }) => {
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
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
