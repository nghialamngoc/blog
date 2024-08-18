import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const PostSantitySchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: BookIcon,
  groups: [
    {
      name: 'info',
      title: 'Info',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'info',
      validation: (rule) => rule.required().error('Title is required!'),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      group: 'info',
    }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'info',
      validation: (rule) => rule.required().error('Slug is required!'),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: {
        type: 'category',
      },
    }),
    defineField({
      name: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
    }),
    defineField({
      name: 'summary',
      type: 'text',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    to: [
                      {
                        type: 'post',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {
          type: 'table',
        },
        {
          type: 'code',
          options: {
            languageAlternatives: [
              { title: 'Javascript', value: 'javascript' },
              { title: 'Typescript', value: 'typescript' },
              { title: 'React', value: 'jsx' },
            ],
            withFilename: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'mainImage',
      date: '_createdAt',
    },
    prepare({ title, date, media }) {
      const formatDate = new Date(date).toLocaleDateString()
      return {
        title,
        subtitle: formatDate,
        media,
      }
    },
  },
})
