import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDomainById } from "../services/domainService";
import PerspectiveList from "../components/PerspectiveList";
import AddPerspectiveForm from "../components/AddPerspectiveForm";

const DomainDetailsPage = () => {
  const { id } = useParams();
  const { data: domain, isLoading, isError } = useQuery({
    queryKey: ["domain", id],
    queryFn: () => fetchDomainById(id),
  });

  if (isLoading) return <div>Loading domain details...</div>;
  if (isError) return <div>Error fetching domain details</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{domain.name}</h1>
      <p className="mb-4"><strong>Type:</strong> {domain.type}</p>
      <p className="mb-4"><strong>Description:</strong> {domain.description}</p>
      <h2 className="text-2xl font-bold mb-4">Perspectives</h2>
      <PerspectiveList perspectives={domain.perspectives} />
      <AddPerspectiveForm domainId={id} />
    </div>
  );
};

export default DomainDetailsPage;
