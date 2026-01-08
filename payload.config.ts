import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import path from 'path';

import { Puppies } from './src/collections/Puppies';
import { Gallery } from './src/collections/Gallery';
import { Contacts } from './src/collections/Contacts';
import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Pages } from './src/collections/Pages';
import { NavbarDropdown } from './src/collections/NavbarDropdown';
import { Logo } from './src/admin/Logo';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      graphics: {
        Logo: Logo,
        Icon: Logo,
      },
    },
    livePreview: {
      url: ({ data, collection }) => {
        const frontendURL = process.env.VITE_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3000';
        
        // Return preview URL based on collection
        if (collection?.slug === 'puppies') {
          return `${frontendURL}/#puppies`;
        }
        if (collection?.slug === 'gallery') {
          return `${frontendURL}/#gallery`;
        }
        
        return `${frontendURL}`;
      },
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Puppies, Gallery, Contacts, Pages],
  globals: [NavbarDropdown],
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/dog-breeding-website',
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
});

