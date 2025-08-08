import React from 'react';

interface ContactMapProps {
  address: string;
}

const ContactMap = ({ address }: ContactMapProps) => {
  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <img 
        src="/lovable-uploads/05bff550-aac3-4cbc-a987-25115d9f3b19.png"
        alt={`Map showing ${address}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ContactMap;