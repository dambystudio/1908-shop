// tina/config.ts
import { defineConfig } from 'tinacms'
var branch =
  process.env.GITHUB_HEAD_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.TINA_BRANCH ||
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  'main'
var clientId = process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''
var token = process.env.TINA_TOKEN || process.env.NEXT_PUBLIC_TINA_TOKEN || ''
var isLocalMode = process.env.TINA_PUBLIC_IS_LOCAL === 'true'
var DEFAULT_CUSTOMIZATION_PRICE = 4
var slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
var generateProductSlug = (values) => {
  const name = values?.name || 'new-product'
  const season = values?.season || ''
  const productType = values?.productType || ''
  const club = values?.club || ''
  const parts = [name]
  if (club && !name.toLowerCase().includes(club.toLowerCase())) {
    parts.unshift(club)
  }
  if (season) {
    parts.push(season)
  }
  if (productType && productType !== 'standard') {
    parts.push(productType)
  }
  const baseSlug = slugify(parts.join(' '))
  const timestamp = Date.now().toString(36).slice(-6)
  return `${baseSlug}-${timestamp}`
}
var schema = {
  collections: [
    {
      name: 'product',
      label: 'Products',
      path: 'content/products',
      format: 'json',
      // Auto-generate filename from slug to avoid collisions
      ui: {
        filename: {
          readonly: true,
          slugify: (values) => {
            return generateProductSlug(values)
          },
        },
      },
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
          label: 'Slug (URL)',
          description: 'Auto-generated from product name. Used in the product URL.',
          ui: {
            // Make it readonly - auto-generated
            component: 'hidden',
          },
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
            { value: 'standard', label: 'Standard (\u20AC24.99)' },
            { value: 'longsleeve', label: 'Longsleeve (\u20AC27.99)' },
            { value: 'player-version-adidas', label: 'Player Version Adidas (\u20AC27.99)' },
            { value: 'player-version-other', label: 'Player Version Other (\u20AC28.99)' },
            { value: 'retro', label: 'Retro (\u20AC27.99)' },
            { value: 'retro-longsleeve', label: 'Retro Longsleeve (\u20AC29.99)' },
            { value: 'kids-set', label: 'Kids Set (\u20AC31.99)' },
            { value: 'kids-jersey', label: 'Kids Jersey (\u20AC21.99)' },
            { value: 'kids-shorts', label: 'Kids Shorts (\u20AC14.99)' },
            { value: 'shorts-single', label: 'Shorts Single (\u20AC17.99)' },
            { value: 'shorts-combo', label: 'Shorts Combo (\u20AC14.99)' },
            { value: 'tracksuit', label: 'Tracksuit (\u20AC47.99)' },
          ],
          description: 'Product type determines base pricing',
        },
        {
          type: 'number',
          name: 'basePrice',
          label: 'Base Price (EUR)',
          description: 'Auto-filled based on product type. You can modify if needed.',
          ui: {
            // Default value based on product type will be handled by defaultItem
          },
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
          description: 'e.g., 2024-25',
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
              // Removed required to fix navigation bug
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
          ui: {
            itemProps: (item) => ({
              label: item?.size ? `${item.size} (Stock: ${item.stock || 0})` : 'New Size',
            }),
            defaultItem: {
              size: 'M',
              stock: 10,
            },
          },
          fields: [
            {
              type: 'string',
              name: 'size',
              label: 'Size',
              options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
            {
              type: 'number',
              name: 'stock',
              label: 'Stock Quantity',
            },
          ],
        },
        {
          type: 'boolean',
          name: 'allowCustomization',
          label: 'Allow Name & Number Customization',
          description: 'Enable player name and number personalization (default price: \u20AC4)',
        },
        {
          type: 'number',
          name: 'customizationPrice',
          label: 'Customization Price (EUR)',
          description: 'Additional cost for name + number. Default: \u20AC4',
          ui: {
            // Show default value hint
          },
        },
        {
          type: 'object',
          name: 'patches',
          label: 'Available Patches',
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.name ? `${item.name} (\u20AC${item.price || 0})` : 'New Patch',
            }),
            defaultItem: {
              id: '',
              name: '',
              price: 2.99,
            },
          },
          fields: [
            {
              type: 'string',
              name: 'id',
              label: 'Patch ID',
            },
            {
              type: 'string',
              name: 'name',
              label: 'Patch Name',
            },
            {
              type: 'number',
              name: 'price',
              label: 'Patch Price (EUR)',
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
      // Default values for new products
      defaultItem: () => {
        const timestamp = Date.now().toString(36).slice(-6)
        return {
          slug: `new-product-${timestamp}`,
          // Will be updated when name is set
          productType: 'standard',
          basePrice: 24.99,
          customizationPrice: DEFAULT_CUSTOMIZATION_PRICE,
          allowCustomization: true,
          published: false,
          featured: false,
          sizes: [
            { size: 'S', stock: 10 },
            { size: 'M', stock: 10 },
            { size: 'L', stock: 10 },
            { size: 'XL', stock: 10 },
          ],
          createdAt: /* @__PURE__ */ new Date().toISOString(),
        }
      },
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
            validate: (value) => {
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
var config_default = defineConfig({
  branch,
  clientId,
  token,
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
  schema,
  // Search is disabled to avoid SQLite build issues on Vercel
  // Can be re-enabled later with proper TinaCloud search configuration
})
export { config_default as default }
