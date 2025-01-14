import { HeaderClient } from './Component.client';
import { getCachedGlobal } from '@/utilities/getGlobals';
import React from 'react';

import type { Header } from '@/payload-types';

export async function Header() {
  const headerData: Header = await getCachedGlobal('nav', 1)();
  console.log('headerData', JSON.stringify(headerData, null, 2));
  return <HeaderClient data={headerData} />;
}
