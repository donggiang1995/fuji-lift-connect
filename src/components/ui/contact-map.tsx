import React, { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { MapPin } from 'lucide-react';

interface ContactMapProps {
  address: string;
}

const ContactMap = ({ address }: ContactMapProps) => {
  const [apiKey, setApiKey] = useState('');
  const [keySubmitted, setKeySubmitted] = useState(false);

  const handleKeySubmit = () => {
    if (apiKey.trim()) {
      setKeySubmitted(true);
    }
  };

  if (!keySubmitted) {
    return (
      <div className="aspect-video bg-muted flex flex-col items-center justify-center rounded-lg p-6 space-y-4">
        <MapPin className="h-16 w-16 text-muted-foreground" />
        <div className="text-center space-y-4 max-w-sm">
          <h3 className="font-semibold">Google Maps API Key Required</h3>
          <p className="text-sm text-muted-foreground">
            Please enter your Google Maps API key to display the map. 
            You can get it from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
          </p>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter Google Maps API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-sm"
            />
            <Button 
              onClick={handleKeySubmit}
              disabled={!apiKey.trim()}
              size="sm"
              className="w-full"
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Google Maps Static API URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=16&size=600x400&maptype=roadmap&markers=color:blue%7C${encodeURIComponent(address)}&key=${apiKey}`;

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <img 
        src={mapUrl}
        alt={`Map showing ${address}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback if the address doesn't work, use Seoul coordinates
          const fallbackUrl = `https://maps.googleapis.com/maps/api/staticmap?center=37.4979,127.0276&zoom=16&size=600x400&maptype=roadmap&markers=color:blue%7C37.4979,127.0276&key=${apiKey}`;
          (e.target as HTMLImageElement).src = fallbackUrl;
        }}
      />
    </div>
  );
};

export default ContactMap;