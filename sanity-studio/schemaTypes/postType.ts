import {Rule} from 'sanity'

export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (Rule: Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    prepare(selection: {title: string; authorName: string; authorUsername: string; media: string}) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title: title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media: media,
      }
    },
  },
}
