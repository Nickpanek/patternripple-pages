export default {
  name: 'pattern',
  title: 'Pattern',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule:any)=>Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'priceCents', title: 'Price (cents)', type: 'number' },
    { name: 'preview', title: 'Preview Image', type: 'image', options: { hotspot: true } },
    { name: 'file', title: 'Download File (ZIP/PNG)', type: 'file' },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' }
  ]
};
