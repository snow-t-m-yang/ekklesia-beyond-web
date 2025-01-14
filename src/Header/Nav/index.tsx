'use client';

import React from 'react';

import type { Header as HeaderType } from '@/payload-types';
import type { Nav as NavType } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

export const HeaderNav: React.FC<{ data: NavType }> = ({ data }) => {
  const navItems = data?.items || [];

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink className="text-xl text-foreground" key={i} {...link} appearance="link" />;
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-16" />
      </Link>
    </nav>
  );
};
