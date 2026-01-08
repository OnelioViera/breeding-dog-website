import { CollectionConfig } from 'payload/types';

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      const frontendURL = process.env.VITE_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3000';
      return `${frontendURL}/#gallery`;
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Puppies', value: 'puppies' },
        { label: 'Adults', value: 'adults' },
        { label: 'Family', value: 'family' },
        { label: 'Facility', value: 'facility' },
      ],
    },
  ],
};

