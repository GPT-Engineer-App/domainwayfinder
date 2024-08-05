import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DomainList = ({ domains }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain) => (
        <Link key={domain.id} to={`/domain/${domain.id}`} className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{domain.name}</CardTitle>
              <CardDescription>
                <span className="font-semibold">Type:</span> {domain.type}
              </CardDescription>
              <CardDescription className="mt-2">{domain.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
