import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pattern',
  title: 'Pattern',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required().min(3).max(80) }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),

    defineField({
      name: 'image',
      title: 'Master Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required().min(5) }),
      ],
      validation: r => r.required(),
    }),

    // exclusivity
    defineField({ name: 'isExclusive', title: 'Exclusive Pattern', type: 'boolean', initialValue: true }),
    defineField({
      name: 'exclusivityStatus',
      title: 'Exclusivity Status',
      type: 'string',
      options: { list: [
        { title: 'Available', value: 'available' },
        { title: 'Sold', value: 'sold' },
        { title: 'Reserved', value: 'reserved' },
      ], layout: 'radio' },
      initialValue: 'available',
    }),
    defineField({ name: 'exclusivePrice', title: 'Exclusive Price USD', type: 'number', validation: r => r.min(1) }),
    defineField({ name: 'saleDate', title: 'Sale Date', type: 'datetime' }),
    defineField({ name: 'soldTo', title: 'Sold To - notes or buyer ref', type: 'string' }),
    defineField({ name: 'daysListed', title: 'Days Listed', type: 'number' }),

    // categories - include faux embroidery
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: [
        { title: 'Floral', value: 'floral' },
        { title: 'Faux Embroidery', value: 'fauxEmbroidery' },
        { title: 'Geometric', value: 'geometric' },
        { title: 'Seasonal', value: 'seasonal' },
        { title: 'Horror', value: 'horror' },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),

    // listing details
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean' }),

    // SEO
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'seoKeywords', title: 'SEO Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),

    // offers
    defineField({ name: 'acceptingOffers', title: 'Accepting Offers', type: 'boolean', initialValue: false }),
    defineField({ name: 'minimumOffer', title: 'Minimum Offer USD', type: 'number', hidden: ({parent}) => !parent?.acceptingOffers }),
    defineField({ name: 'currentOffers', title: 'Current Offers - notes', type: 'array', of: [{ type: 'string' }], hidden: ({parent}) => !parent?.acceptingOffers }),
    defineField({ name: 'offerDeadline', title: 'Offer Deadline', type: 'datetime', hidden: ({parent}) => !parent?.acceptingOffers }),
  ],
  preview: {
    select: { title: 'title', media: 'image', status: 'exclusivityStatus', cat: 'category', price: 'exclusivePrice' },
    prepare({ title, media, status, cat, price }) {
      const badge = status === 'sold' ? 'SOLD' : status === 'reserved' ? 'RESERVED' : 'AVAILABLE'
      const subtitle = `${badge} - ${cat || 'uncategorized'}${price ? ` - $${price}` : ''}`
      return { title, media, subtitle }
    },
  },
})
