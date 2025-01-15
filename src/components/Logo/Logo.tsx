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
        'sm:w-[10rem] sm:h-[5rem] xl:w-[12rem] xl:h-[6rem] w-[5rem] h-[3rem] relative transition-all duration-150',
        className,
      )}
    >
      <Image
        alt="Ekklesia Beyond Logo"
        fill
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="object-contain"
        src="/beyond-logo.webp"
      />
    </div>
  );
};
