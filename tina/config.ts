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
          type: 'string',
          name: 'productType',
          label: 'Product Type',
          required: true,
          options: [
            'standard',
            'longsleeve',
            'player-version-adidas',
            'player-version-other',
            'retro',
            'retro-longsleeve',
            'kids-set',
            'kids-jersey',
            'kids-shorts',
            'shorts-combo',
            'tracksuit',
          ],
          description: 'Product type determines base pricing',
        },
        {
          type: 'number',
          name: 'basePrice',
          label: 'Base Price (EUR)',
          required: true,
          description:
            'Standard: €24.99, Longsleeve: €27.99, Player Adidas: €27.99, Player Other: €28.99, Retro: €27.99, Retro LS: €29.99, Kids Set: €31.99, Kids Jersey: €21.99, Kids Shorts: €17.99, Shorts Combo: €14.99, Tracksuit: €47.99-€77.99',
        },
        {
          type: 'string',
          name: 'category',
          label: 'Category',
          required: true,
          options: ['retro', 'competition', 'mystery-box', 'kids', 'shorts', 'tracksuit'],
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
    {
      name: 'review',
      label: 'Reviews',
      path: 'content/reviews',
      format: 'json',
      fields: [
        {
          type: 'string',
          name: 'author',
          label: 'Author Name',
          required: true,
        },
        {
          type: 'number',
          name: 'rating',
          label: 'Rating',
          required: true,
          description: 'Rating from 1 to 5 stars',
          ui: {
            validate: (value: number) => {
              if (value < 1 || value > 5) {
                return 'Rating must be between 1 and 5'
              }
            },
          },
        },
        {
          type: 'string',
          name: 'content',
          label: 'Review Content',
          required: true,
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'productSlug',
          label: 'Product Slug',
          required: true,
          description: 'Slug of the product being reviewed',
        },
        {
          type: 'string',
          name: 'status',
          label: 'Status',
          required: true,
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'rejected', label: 'Rejected' },
          ],
          description: 'Only published reviews will appear on the site',
        },
        {
          type: 'datetime',
          name: 'createdAt',
          label: 'Created At',
          required: true,
        },
        {
          type: 'string',
          name: 'email',
          label: 'Author Email (optional)',
          description: 'For contact purposes only, not displayed',
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
