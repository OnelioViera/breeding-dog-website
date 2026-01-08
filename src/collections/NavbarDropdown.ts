import { GlobalConfig } from 'payload/types';

export const NavbarDropdown: GlobalConfig = {
  slug: 'navbar-dropdown',
  admin: {
    description: 'Configure the Puppies button dropdown in the navigation bar',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'buttonTitle',
      type: 'text',
      required: true,
      defaultValue: 'Puppies',
      admin: {
        description: 'The text displayed on the Puppies button in the navbar',
      },
    },
    {
      name: 'showAvailablePuppies',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show "Available Puppies" option in the dropdown',
      },
    },
    {
      name: 'availablePuppiesLabel',
      type: 'text',
      defaultValue: 'Available Puppies',
      admin: {
        description: 'Label for the "Available Puppies" dropdown option',
      },
    },
    {
      name: 'customItems',
      type: 'array',
      label: 'Custom Dropdown Items',
      admin: {
        description: 'Add custom dropdown items that link to specific pages',
      },
      fields: [
        {
          name: 'linkType',
          type: 'select',
          required: true,
          defaultValue: 'page',
          options: [
            { label: 'Link to Page', value: 'page' },
            { label: 'Custom Link', value: 'custom' },
            { label: 'Section (Hash Link)', value: 'section' },
          ],
          admin: {
            description: 'Choose whether to link to a page, custom URL, or section',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: false,
          hasMany: false,
          admin: {
            description: 'Select a page to link to (only shown when "Link to Page" is selected)',
            condition: (data, siblingData) => {
              return siblingData?.linkType === 'page';
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: false,
          admin: {
            description: 'The text displayed in the dropdown. Leave empty to use the page title when linking to a page.',
            condition: (data, siblingData) => {
              // Show title field for all link types, but it's optional
              return true;
            },
          },
          hooks: {
            beforeChange: [
              async ({ value, data, siblingData, req }) => {
                // If title is empty and linkType is 'page' and page is selected, auto-populate from page
                if (!value && siblingData?.linkType === 'page' && siblingData?.page) {
                  try {
                    const pageId = typeof siblingData.page === 'string' 
                      ? siblingData.page 
                      : siblingData.page.id || siblingData.page;
                    
                    if (pageId) {
                      const page = await req.payload.findByID({
                        collection: 'pages',
                        id: pageId,
                      });
                      if (page && page.title) {
                        return page.title;
                      }
                    }
                  } catch (error) {
                    console.error('Error fetching page for title:', error);
                  }
                }
                return value;
              },
            ],
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          admin: {
            description: 'The URL or section ID to link to (e.g., "/page" or "#section"). Only shown when "Custom Link" or "Section" is selected.',
            condition: (data, siblingData) => {
              return siblingData?.linkType !== 'page';
            },
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab',
          },
        },
      ],
    },
  ],
};

