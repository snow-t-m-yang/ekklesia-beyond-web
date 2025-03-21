'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect } from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('light');
  });

  return (
    <>
      {media && typeof media === 'object' ? (
        <div className="flex items-center justify-center" data-theme="light">
          <div className="container pt-16 mb-8 z-10 relative flex items-center justify-center">
            <div className="max-w-[36.5rem] md:text-center">
              {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex md:justify-center gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          {media && typeof media === 'object' && (
            <div className="min-h-[100dvh] select-none">
              <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            </div>
          )}
        </div>
      ) : (
        <AuroraBackground>
          <div className="flex items-center justify-center" data-theme="light">
            <div className="container pt-16 mb-8 z-10 relative flex items-center justify-center">
              <div className="max-w-[36.5rem] md:text-center">
                {richText && (
                  <RichText
                    className="mb-6"
                    data={richText}
                    enableGutter={false}
                  />
                )}
                {Array.isArray(links) && links.length > 0 && (
                  <ul className="flex md:justify-center gap-4">
                    {links.map(({ link }, i) => {
                      return (
                        <li key={i}>
                          <CMSLink {...link} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </AuroraBackground>
      )}
    </>
  );
};
