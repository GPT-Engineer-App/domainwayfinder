import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDomains } from "../services/domainService";
import DomainList from "../components/DomainList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Search, TrendingUp, BookOpen, Users, Zap } from "lucide-react";

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
      <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Domain Navigational Tool</h1>
      
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Explore Domains</CardTitle>
          <CardDescription>Search and discover various domains of knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow text-lg"
            />
            <Button size="lg">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Domains</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4">Loading domains...</p>
            </div>
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
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 text-primary" /> Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore new domains and expand your knowledge base.</p>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/domains">Browse Domains</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 text-primary" /> Connect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Engage with experts and enthusiasts in various domains.</p>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/community">Join Community</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 text-primary" /> Contribute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Share your knowledge and help grow the domain network.</p>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/contribute">Start Contributing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
