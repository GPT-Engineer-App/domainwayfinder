import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDomains, createDomain } from "../services/domainService";
import DomainList from "../components/DomainList";
import AddDomainForm from "../components/AddDomainForm";

const HomePage = () => {
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const { data: domains, isLoading, isError, refetch } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  const handleAddDomain = async (newDomain) => {
    await createDomain(newDomain);
    refetch();
    setIsAddingDomain(false);
  };

  if (isLoading) return <div>Loading domains...</div>;
  if (isError) return <div>Error fetching domains</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Domain Navigational Tool</h1>
      <button
        onClick={() => setIsAddingDomain(true)}
        className="bg-primary text-primary-foreground px-4 py-2 rounded mb-4"
      >
        Add New Domain
      </button>
      {isAddingDomain && (
        <AddDomainForm onAddDomain={handleAddDomain} onCancel={() => setIsAddingDomain(false)} />
      )}
      <DomainList domains={domains} />
    </div>
  );
};

export default HomePage;
