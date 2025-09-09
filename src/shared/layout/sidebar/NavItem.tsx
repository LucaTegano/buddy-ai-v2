import React from 'react';
import Link from 'next/link';
import { NavItemProps } from '@/shared/types/UI';

const NavItem: React.FC<NavItemProps> = ({ icon, text, active, isOpen, href }) => (
  <Link 
    href={href} 
    className={`flex w-full items-center p-3 my-1 rounded-lg text-text-primary transition-colors duration-200 ${
      active ? 'bg-brand-subtle font-semibold' : 'hover:bg-hover'
    }`}
  >
    {icon}
    <span className={`overflow-hidden transition-all whitespace-nowrap ${isOpen ? 'w-40 ml-4' : 'w-0'}`}>
      {text}
    </span>
  </Link>
);

export default NavItem;