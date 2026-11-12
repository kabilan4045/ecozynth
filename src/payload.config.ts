// Switch back to Postgres (Supabase) before production
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // Ecozynth: light-only, ecommerce-focused admin. Styles live in src/app/(payload)/custom.scss.
    theme: 'light',
    meta: {
      titleSuffix: ' – Ecozynth Admin',
      icons: [{ rel: 'icon', type: 'image/png', url: '/brand/logo-mark.png' }],
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      beforeNavLinks: [
        '@/components/admin/graphics#EcozynthNavBrand',
        '@/components/admin/NavDefaultOpen#NavDefaultOpen',
      ],
      graphics: {
        Icon: '@/components/admin/graphics#EcozynthIcon',
        Logo: '@/components/admin/graphics#EcozynthLogo',
      },
      providers: ['@/components/admin/AdminFontProvider#AdminFontProvider'],
      views: {
        // Replaces the default dashboard (and the template's BeforeDashboard welcome block).
        dashboard: {
          Component: '@/components/admin/Dashboard#EcommerceDashboard',
        },
      },
    },
    user: Users.slug,
  },
  collections: [Users, Pages, Categories, Media],
  // Temporary local SQLite database for development.
  // Switch back to Postgres (Supabase) before production:
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URL || '',
  //   },
  // }),
  db: sqliteAdapter({
    client: {
      url: process.env.SQLITE_URL || 'file:./ecozynth-dev.db',
    },
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

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
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  //email: nodemailerAdapter(),
  endpoints: [],
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
