import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'place',
      type: 'text',
      required: true,
    },
    {
      name: 'googleMapEmbedLink',
      type: 'text',
      required: true,
    },
  ],
}
