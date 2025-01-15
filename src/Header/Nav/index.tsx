'use client';

import React, { useState } from 'react';

import type { Nav as NavType } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/utilities/cn';
import { motion } from 'motion/react';

export const HeaderNav: React.FC<{ data: NavType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = data?.items || [];

  return (
    <nav className="flex gap-3 items-center">
      <div className="xs:flex gap-3 items-center hidden">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink className="text-xl text-foreground" key={i} {...link} appearance="link" />
          );
        })}
      </div>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-16" />
      </Link>

      {/* NavToogler */}
      <button
        className="relative w-10 h-10 z-50 focus:outline-none block xs:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label="Toogle mobile navigation"
      >
        <div className="transfrom">
          <span
            className={cn(
              'block absolute h-0.5 w-[1.5rem] bg-current transform transition duration-500 ease-in-out',
              isOpen ? 'rotate-45' : '-translate-y-[5px]',
            )}
          ></span>
          <span
            className={cn(
              'block absolute h-0.5 w-[1.5rem] bg-current transform transition duration-500 ease-in-out',
              isOpen ? '-rotate-45' : 'translate-y-[5px]',
            )}
          ></span>
        </div>
      </button>

      {/* Mobile Nav */}
      {/* TODO: Add sub navigation */}
      <motion.div
        id="mobile-nav"
        className={cn('fixed h-dvh top-0 left-0 w-full bg-background z-20')}
        animate={{
          y: isOpen ? 0 : '-100%',
          opacity: isOpen ? 1 : 0,
          transition: { duration: 0.3, ease: 'easeIn' },
        }}
      >
        <ul className="flex flex-col gap-5 px-16 pt-16">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink className="text-3xl text-foreground" key={i} {...link} appearance="link" />
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
};
