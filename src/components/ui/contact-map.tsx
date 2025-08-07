import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './input';
import { Button } from './button';
import { MapPin } from 'lucide-react';

interface ContactMapProps {
  address: string;
}

const ContactMap = ({ address }: ContactMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || !token) return;

    setIsLoading(true);
    mapboxgl.accessToken = token;

    try {
      // Seoul coordinates as fallback (near the actual address)
      const seoulCoordinates: [number, number] = [127.0276, 37.4979]; // Gangnam area
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: seoulCoordinates,
        zoom: 15,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add a marker for the location
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat(seoulCoordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="p-2"><strong>FUJI Global Korea</strong><br/>${address}</div>`)
        )
        .addTo(map.current);

      // Try to geocode the actual address
      try {
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&country=KR&limit=1`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          
          // Update map center and marker
          map.current.setCenter([lng, lat]);
          
          // Remove existing markers and add new one
          const markers = document.querySelectorAll('.mapboxgl-marker');
          markers.forEach(marker => marker.remove());
          
          new mapboxgl.Marker({ color: '#3B82F6' })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<div class="p-2"><strong>FUJI Global Korea</strong><br/>${address}</div>`)
            )
            .addTo(map.current);
        }
      } catch (error) {
        console.log('Geocoding failed, using Seoul area coordinates');
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenSubmitted(true);
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!tokenSubmitted) {
    return (
      <div className="aspect-video bg-muted flex flex-col items-center justify-center rounded-lg p-6 space-y-4">
        <MapPin className="h-16 w-16 text-muted-foreground" />
        <div className="text-center space-y-4 max-w-sm">
          <h3 className="font-semibold">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground">
            Please enter your Mapbox public token to display the map. 
            You can find it at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-sm"
            />
            <Button 
              onClick={handleTokenSubmit}
              disabled={!mapboxToken.trim()}
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

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default ContactMap;