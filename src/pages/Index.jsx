import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDomains } from "../services/domainService";
import DomainList from "../components/DomainList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Search, TrendingUp } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: domains, isLoading, isError } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  const filteredDomains = domains?.filter(domain =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Domain Navigational Tool</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Explore Domains</CardTitle>
          <CardDescription>Search and discover various domains of knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Domains</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {isLoading ? (
            <div className="text-center py-8">Loading domains...</div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">Error loading domains. Please try again.</div>
          ) : (
            <DomainList domains={filteredDomains} />
          )}
        </TabsContent>
        <TabsContent value="popular">
          <div className="text-center py-8">Popular domains coming soon...</div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="text-center py-8">Recently added domains coming soon...</div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2" /> Explore
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover new domains and expand your knowledge.</p>
            <Button className="mt-4" asChild>
              <Link to="/domains">View All Domains</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" /> Trending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>See what's popular in the community right now.</p>
            <Button className="mt-4" asChild>
              <Link to="/trending">View Trends</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2" /> Advanced Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Use our powerful search tools to find exactly what you need.</p>
            <Button className="mt-4" asChild>
              <Link to="/search">Advanced Search</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
