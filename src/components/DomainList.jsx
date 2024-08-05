import { Link } from "react-router-dom";

const DomainList = ({ domains }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {domains.map((domain) => (
        <Link key={domain.id} to={`/domain/${domain.id}`} className="block">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{domain.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Type: {domain.type}</p>
            <p className="text-sm">{domain.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
