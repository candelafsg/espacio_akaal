

import React from "react";
import { Button } from "../buttons/Button";

const WhatsAppLink = ({ message = "", children, ...props }) => {
  const phone = "34622502066"; // número fijo de la empresa
  const whatsappLink = message ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://wa.me/${phone}`;
 
 
 

  return (
    
    
    <Button
    as="a"
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </Button>
    
    
    
    
    
  );
};

export default WhatsAppLink;
