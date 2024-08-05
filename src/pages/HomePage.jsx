import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDomains, createDomain } from "../services/domainService";
import DomainList from "../components/DomainList";
import AddDomainForm from "../components/AddDomainForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HomePage = () => {
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: domains, isLoading, isError, refetch } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  const filteredDomains = domains?.filter(domain =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDomain = async (newDomain) => {
    await createDomain(newDomain);
    refetch();
    setIsAddingDomain(false);
  };

  if (isLoading) return <div className="text-center py-8">Loading domains...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching domains</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Domain Navigational Tool</h1>
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => setIsAddingDomain(true)}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Domain
        </Button>
        <Input
          type="text"
          placeholder="Search domains..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>
      {isAddingDomain && (
        <AddDomainForm onAddDomain={handleAddDomain} onCancel={() => setIsAddingDomain(false)} />
      )}
      <DomainList domains={filteredDomains} />
    </div>
  );
};

export default HomePage;
