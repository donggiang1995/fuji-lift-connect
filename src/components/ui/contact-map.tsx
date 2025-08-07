import React from 'react';

interface ContactMapProps {
  address: string;
}

const ContactMap = ({ address }: ContactMapProps) => {
  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <img 
        src="/lovable-uploads/ed5049fa-e594-4bc3-87e3-ac19dc0a1789.png"
        alt={`Map showing ${address}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ContactMap;