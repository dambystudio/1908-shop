import { defineConfig } from 'tinacms'

// Placeholder schema - will be fully defined in Stage 2
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
          type: 'number',
          name: 'basePrice',
          label: 'Base Price (EUR)',
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
  schema: schema as any, // Placeholder - will be properly typed in Stage 2
})
