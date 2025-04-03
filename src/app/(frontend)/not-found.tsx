import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center gap-y-5 flex-col justify-center min-h-screen bg-gray-100">
      <h1 className="mb-0 text-7xl text-primary font-bold">404</h1>
      <div className="leading-tight max-w-none text-3xl text-center text-gray-800">
        <p>页面未找到</p>
        <p>頁面未找到</p>
        <p>Page not found</p>
        <p>Página no encontrada</p>
        <p>ページが見つかりません</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">回到主页</Link>
      </Button>
    </div>
  );
}
