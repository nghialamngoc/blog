import { defineField, defineType } from 'sanity'

export const CategorySantitySchema = defineType({
  name: 'category',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required().error('label is required!'),
    }),
    defineField({
      name: 'value',
      type: 'slug',
      options: {
        source: 'label',
      },
      validation: (rule) => rule.required().error('value is required!'),
    }),
    defineField({
      name: 'href',
      type: 'slug',
      options: {
        source: 'label',
        slugify: (source) => `/${source.toLocaleLowerCase()}`,
      },
      validation: (rule) => rule.required().error('href is required!'),
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().error('order is required!').min(0).error('mininum is 0'),
    }),
    defineField({
      name: 'parent',
      type: 'string',
    }),
  ],
})
