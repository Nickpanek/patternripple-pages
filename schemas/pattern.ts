import { defineType } from 'sanity'

export default defineType({
  name: 'pattern',
  title: 'Pattern',
  type: 'document',
  fields: [
    { name: 'title', title: 'Pattern Title', type: 'string', validation: (Rule) => Rule.required().min(3).max(100) },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },

    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Floral', value: 'floral' },
          { title: 'Faux Embroidery', value: 'faux-embroidery' },
          { title: 'Geometric', value: 'geometric' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Horror', value: 'horror' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: 'subcategory', title: 'Subcategory', type: 'string', description: 'e.g., roses, skulls, Christmas, etc.' },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },

    { name: 'thumbnail', title: 'Thumbnail (600x600)', type: 'image', description: 'Watermarked preview for catalog', validation: (Rule) => Rule.required() },
    { name: 'sourceFile', title: 'Source File (6000x6000)', type: 'file', description: 'High-resolution PNG for buyers' },
    {
      name: 'mockups',
      title: 'Product Mockups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Mockup Image', type: 'image' },
            { name: 'title', title: 'Mockup Title', type: 'string' },
            {
              name: 'product',
              title: 'Product Type',
              type: 'string',
              options: { list: ['Tote Bag', 'Pillow', 'Phone Case', 'Wallpaper', 'Fabric', 'Other'] },
            },
          ],
        },
      ],
    },

    { name: 'isExclusive', title: 'Exclusive Pattern', type: 'boolean', initialValue: true, readOnly: true },
    { name: 'basePrice', title: 'Base Price ($)', type: 'number', validation: (Rule) => Rule.required().min(1) },
    {
      name: 'exclusivityStatus',
      title: 'Exclusivity Status',
      type: 'string',
      options: { list: [{ title: 'Available', value: 'available' }, { title: 'Reserved', value: 'reserved' }, { title: 'Sold', value: 'sold' }] },
      initialValue: 'available',
    },

    { name: 'listingDate', title: 'Listing Date', type: 'datetime', initialValue: () => new Date().toISOString() },
    { name: 'saleDate', title: 'Sale Date', type: 'datetime', hidden: ({ document }) => document?.exclusivityStatus !== 'sold' },
    { name: 'soldPrice', title: 'Sold Price ($)', type: 'number', hidden: ({ document }) => document?.exclusivityStatus !== 'sold' },
    {
      name: 'buyerInfo',
      title: 'Buyer Information',
      type: 'object',
      hidden: ({ document }) => document?.exclusivityStatus !== 'sold',
      fields: [
        { name: 'name', title: 'Buyer Name', type: 'string' },
        {
          name: 'email',
          title: 'Buyer Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        { name: 'company', title: 'Company (optional)', type: 'string' },
      ],
    },

    { name: 'acceptingOffers', title: 'Accepting Offers', type: 'boolean', description: 'Enable after 30 days listed', initialValue: false },
    {
      name: 'minimumOffer',
      title: 'Minimum Offer ($)',
      type: 'number',
      description: 'Reserve price (60% of base price recommended)',
      hidden: ({ document }) => !document?.acceptingOffers,
    },
    { name: 'offerDeadline', title: 'Offer Deadline', type: 'datetime', hidden: ({ document }) => !document?.acceptingOffers },
    {
      name: 'currentOffers',
      title: 'Current Offers',
      type: 'array',
      hidden: ({ document }) => !document?.acceptingOffers,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'amount', title: 'Offer Amount ($)', type: 'number' },
            { name: 'offerDate', title: 'Offer Date', type: 'datetime' },
            {
              name: 'buyerEmail',
              title: 'Buyer Email',
              type: 'string',
              validation: (Rule) => Rule.email(),
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: { list: ['pending', 'accepted', 'declined'] },
              initialValue: 'pending',
            },
          ],
        },
      ],
    },

    { name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Custom title for search engines', validation: (Rule) => Rule.max(60) },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', description: 'Description for search results', validation: (Rule) => Rule.max(160) },
    { name: 'seoKeywords', title: 'SEO Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'altText', title: 'Alt Text', type: 'string', description: 'Accessibility description for images' },

    { name: 'featured', title: 'Featured Pattern', type: 'boolean', description: 'Show on homepage/category highlights', initialValue: false },
    { name: 'priority', title: 'Display Priority', type: 'number', description: 'Higher numbers appear first', initialValue: 0 },

    { name: 'views', title: 'Page Views', type: 'number', readOnly: true, initialValue: 0 },
    { name: 'lastViewed', title: 'Last Viewed', type: 'datetime', readOnly: true },
  ],

  preview: {
    select: { title: 'title', media: 'thumbnail', category: 'category', status: 'exclusivityStatus', price: 'basePrice' },
    prepare(selection) {
      const { title, media, category, status, price } = selection
      const statusEmoji = status === 'sold' ? '🔴' : status === 'reserved' ? '🟡' : '🟢'
      return { title, subtitle: `${statusEmoji} ${category} - $${price}`, media }
    },
  },

  orderings: [
    { title: 'Newest First', name: 'listingDateDesc', by: [{ field: 'listingDate', direction: 'desc' }] },
    { title: 'Price: Low to High', name: 'priceAsc', by: [{ field: 'basePrice', direction: 'asc' }] },
    { title: 'Price: High to Low', name: 'priceDesc', by: [{ field: 'basePrice', direction: 'desc' }] },
    { title: 'Category', name: 'category', by: [{ field: 'category', direction: 'asc' }] },
  ],
})
