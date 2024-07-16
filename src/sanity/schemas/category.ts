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
  ],
})
