import React from 'react';
import { ContactIcon } from './ContactIcon';
import type { IconType } from 'react-icons';

interface Contact {
  Icon: IconType | React.ReactNode;
  url: string;
  bgColor?: string;
  iconColor?: string;
}

interface ContactSectionProps {
  contacts: Contact[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contacts }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
      {contacts.map((contact, index) => (
        <ContactIcon 
          key={index} 
          Icon={contact.Icon} 
          url={contact.url} 
          bgColor={contact.bgColor} 
          iconColor={contact.iconColor} 
        />
      ))}
    </div>
  );
}; 