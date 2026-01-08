import { CollectionConfig } from 'payload/types';

export const Puppies: CollectionConfig = {
  slug: 'puppies',
  admin: {
    useAsTitle: 'name',
    preview: (doc) => {
      const frontendURL = process.env.VITE_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3000';
      return `${frontendURL}/#puppies`;
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'breed',
      type: 'text',
      required: true,
      defaultValue: 'Australian Labradoodle',
    },
    {
      name: 'age',
      type: 'text',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
      required: true,
    },
    {
      name: 'price',
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
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'litter',
      type: 'text',
      admin: {
        description: 'The litter name this puppy belongs to (e.g., "Spring 2024 Litter", "Bella x Max Litter")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'inquiryModalTitle',
      type: 'text',
      admin: {
        description: 'Custom title for the inquiry modal (optional - uses default if empty)',
      },
    },
    {
      name: 'inquiryModalDescription',
      type: 'textarea',
      admin: {
        description: 'Custom description for the inquiry modal (optional - uses default if empty)',
      },
    },
    {
      name: 'inquiryModalFooterText',
      type: 'textarea',
      admin: {
        description: 'Additional information displayed below the submit button in the inquiry modal',
      },
    },
  ],
};

