import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import React from 'react';

import type { Footer } from '@/payload-types';

import { ThemeSelector } from '@/providers/Theme/ThemeSelector';
import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();

  const navItems = footerData?.navItems || [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-white dark:bg-card">
      <section className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} />;
            })}
          </nav>
        </div>
      </section>

      <section className="container pb-8 text-muted-foreground">
        <span>{`© ${currentYear} Ekklesia Beyond All rights reserved.`}</span>
      </section>
    </footer>
  );
}
