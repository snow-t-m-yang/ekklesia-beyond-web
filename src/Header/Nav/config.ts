import type { GlobalConfig } from 'payload';

import { revalidateHeader } from '../hooks/revalidateHeader';
import { linkGroup } from '@/fields/linkGroup';
import { link } from '@/fields/link';

export const Nav: GlobalConfig = {
  slug: 'nav',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        linkGroup({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
