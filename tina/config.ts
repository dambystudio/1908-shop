import { defineConfig } from 'tinacms'

// Complete schema for Stage 2 - Product & Category collections
const schema = {
  collections: [
    {
      name: 'product',
      label: 'Products',
      path: 'content/products',
      format: 'json',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Product Name',
          required: true,
        },
        {
          type: 'string',
          name: 'slug',
          label: 'Slug',
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
          required: true,
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'number',
          name: 'basePrice',
          label: 'Base Price (EUR)',
          required: true,
        },
        {
          type: 'string',
          name: 'category',
          label: 'Category',
          required: true,
          options: ['retro', 'competition', 'mystery-box'],
        },
        {
          type: 'string',
          name: 'competition',
          label: 'Competition',
          options: [
            'serie-a',
            'premier-league',
            'la-liga',
            'bundesliga',
            'ligue-1',
            'champions-league',
            'europa-league',
            'other',
          ],
        },
        {
          type: 'string',
          name: 'club',
          label: 'Club',
        },
        {
          type: 'string',
          name: 'season',
          label: 'Season',
          description: 'e.g., 2023-24',
        },
        {
          type: 'object',
          name: 'images',
          label: 'Images',
          fields: [
            {
              type: 'image',
              name: 'main',
              label: 'Main Image',
              required: true,
            },
            {
              type: 'image',
              name: 'gallery',
              label: 'Gallery Images',
              list: true,
            },
          ],
        },
        {
          type: 'object',
          name: 'sizes',
          label: 'Available Sizes',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'size',
              label: 'Size',
              required: true,
              options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
            {
              type: 'number',
              name: 'stock',
              label: 'Stock Quantity',
              required: true,
            },
          ],
        },
        {
          type: 'boolean',
          name: 'allowCustomization',
          label: 'Allow Name & Number Customization',
          description: 'Enable player name and number personalization',
        },
        {
          type: 'number',
          name: 'customizationPrice',
          label: 'Customization Price (EUR)',
          description: 'Additional cost for name + number',
        },
        {
          type: 'object',
          name: 'patches',
          label: 'Available Patches',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'id',
              label: 'Patch ID',
              required: true,
            },
            {
              type: 'string',
              name: 'name',
              label: 'Patch Name',
              required: true,
            },
            {
              type: 'number',
              name: 'price',
              label: 'Patch Price (EUR)',
              required: true,
            },
            {
              type: 'image',
              name: 'image',
              label: 'Patch Image',
            },
          ],
        },
        {
          type: 'boolean',
          name: 'featured',
          label: 'Featured Product',
          description: 'Show in homepage featured section',
        },
        {
          type: 'boolean',
          name: 'published',
          label: 'Published',
          description: 'Make product visible on site',
        },
        {
          type: 'datetime',
          name: 'createdAt',
          label: 'Created At',
        },
      ],
    },
    {
      name: 'category',
      label: 'Categories',
      path: 'content/categories',
      format: 'json',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Category Name',
          required: true,
        },
        {
          type: 'string',
          name: 'slug',
          label: 'Slug',
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image',
          name: 'image',
          label: 'Category Image',
        },
        {
          type: 'number',
          name: 'order',
          label: 'Display Order',
          description: 'Lower numbers appear first',
        },
      ],
    },
  ],
}

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: schema as any, // Type cast maintained for compatibility
})
