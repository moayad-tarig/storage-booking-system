'use client'


import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StorageUnitCard from "@/components/StorageUnitCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { api } from "@/services/api";
import toast from "react-hot-toast";

const StorageUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (sizeFilter !== "all") filters.size = sizeFilter;
      if (availabilityFilter !== "all") filters.available = availabilityFilter === "available";
      
      const response = await api.getUnits(filters);
      setUnits(response.data);
     
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load units');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setSizeFilter(newFilter);
    toast.loading('Updating filters...', { id: 'filter' });
    fetchUnits().then(() => {
      toast.success('Filters updated', { id: 'filter' });
    }).catch(() => {
      toast.error('Failed to update filters', { id: 'filter' });
    });
  };

  const handleAvailabilityChange = (newFilter) => {
    setAvailabilityFilter(newFilter);
    toast.loading('Updating filters...', { id: 'filter' });
    fetchUnits().then(() => {
      toast.success('Filters updated', { id: 'filter' });
    }).catch(() => {
      toast.error('Failed to update filters', { id: 'filter' });
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSizeFilter("all");
    setAvailabilityFilter("all");
    toast.loading('Clearing filters...', { id: 'filter' });
    fetchUnits().then(() => {
      toast.success('Filters cleared', { id: 'filter' });
    }).catch(() => {
      toast.error('Failed to clear filters', { id: 'filter' });
    });
  };

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Storage Units</h1>
          <p className="text-gray-600">Find the perfect storage solution for your needs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search units or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sizeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Small Units</SelectItem>
                <SelectItem value="medium">Medium Units</SelectItem>
                <SelectItem value="large">Large Units</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={availabilityFilter} onValueChange={handleAvailabilityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="available">Available Only</SelectItem>
                <SelectItem value="unavailable">Occupied Only</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Clear Filters</span>
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <StorageUnitCard key={unit.id} unit={unit} />
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No storage units match your criteria.</p>
            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageUnits;
