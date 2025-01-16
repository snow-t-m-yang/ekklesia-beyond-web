import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    <div
      className={clsx(
        'sm:w-[7rem] sm:h-[5rem] xl:w-[10rem] xl:h-[6rem] w-[3rem] h-[2rem] relative transition-all duration-150',
        className,
      )}
    >
      <Image
        alt="Ekklesia Beyond Logo"
        fill
        loading={loading}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fetchPriority={priority}
        decoding="async"
        className="object-contain"
        src="/beyond-logo.webp"
      />
    </div>
  );
};
