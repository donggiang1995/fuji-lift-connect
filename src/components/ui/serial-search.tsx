import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface SerialSearchProps {
  placeholder?: string;
  onSearch?: (serialNumber: string) => void;
}

interface SerialResult {
  serialNumber: string;
  product: {
    name: string;
    model: string;
    category: string;
  };
  installationDate: string;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export const SerialSearch = ({ placeholder, onSearch }: SerialSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<SerialResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    // Simulate API call - replace with actual Supabase query
    setTimeout(() => {
      // Mock result for demo
      if (searchTerm.includes("FCA-9000")) {
        setResult({
          serialNumber: searchTerm,
          product: {
            name: "FCA-9000 Series",
            model: "FCA-9000",
            category: "Control System"
          },
          installationDate: "2024-01-15",
          location: "Seoul Tower Building",
          status: "active"
        });
      } else {
        setResult(null);
      }
      setLoading(false);
      setIsOpen(true);
    }, 1000);
    
    onSearch?.(searchTerm);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder || "Enter serial number..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 glass-morphism"
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={loading}
          className="btn-industrial"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Serial Number Result</DialogTitle>
          </DialogHeader>
          
          {result ? (
            <div className="space-y-4">
              <div className="industrial-card p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{result.product.name}</h3>
                  {getStatusBadge(result.status)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serial Number:</span>
                    <span className="font-mono">{result.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>{result.product.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{result.product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Installation Date:</span>
                    <span>{result.installationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{result.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No results found for "{searchTerm}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please check the serial number and try again.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};