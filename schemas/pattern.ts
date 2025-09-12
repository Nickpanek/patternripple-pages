export default {
  name: 'pattern',
  title: 'Pattern',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'preview',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail/preview image for the pattern',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'file',
      title: 'Pattern File',
      type: 'file',
      description: 'High-resolution pattern file for download',
      options: {
        accept: '.jpg,.jpeg,.png,.svg,.zip'
      }
    },
    {
      name: 'priceCents',
      title: 'Price (in cents)',
      type: 'number',
      description: 'Price in cents (e.g., 1000 = $10.00)',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Florals', value: 'florals' },
          { title: 'Geometric', value: 'geometric' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Faux Embroidery', value: 'faux-embroidery' },
          { title: 'Wallpaper', value: 'wallpaper' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Set this to make the pattern visible on the site',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'preview',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, media, category } = selection;
      return {
        title,
        subtitle: category ? `Category: ${category}` : '',
        media,
      };
    },
  },
}
