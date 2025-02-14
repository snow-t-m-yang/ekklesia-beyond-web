import { Config } from 'payload';
import {
  BlockquoteFeature,
  BoldFeature,
  ItalicFeature,
  IndentFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical';

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      BlockquoteFeature(),
      BoldFeature(),
      ItalicFeature(),
      IndentFeature(),
      OrderedListFeature(),
      ParagraphFeature(),
      UnderlineFeature(),
      UnorderedListFeature(),
      EXPERIMENTAL_TableFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ];
        },
      }),
    ];
  },
});
