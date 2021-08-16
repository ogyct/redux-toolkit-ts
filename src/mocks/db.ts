import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'
import { Post } from '../common/common'

const db = factory({
        post: {
            id: primaryKey(String),
            title: String,
            body: String
        },
    })

;[
    'A sample post',
    'A post about RTK Query',
    'How to randomly throw errors, a novella',
].forEach((title) => {
    db.post.create({ id: nanoid(), title, body: 'lorem1'})
})

export const handlers = [
    rest.post('/posts', async (req, res, ctx) => {
        const { title, body } = req.body as Partial<Post>

        if (Math.random() < 0.1) {
            return res(
                ctx.json({ error: 'Oh no, there was an error, try again.' }),
                ctx.status(500),
                ctx.delay(300)
            )
        }

        const post = db.post.create({
            id: nanoid(),
            title,
            body
        })

        return res(ctx.json(post), ctx.delay(300))
    }),
    rest.put('/posts/:id', (req, res, ctx) => {
        const { title, body } = req.body as Partial<Post>

        if (Math.random() < 0.1) {
            return res(
                ctx.json({ error: 'Oh no, there was an error, try again.' }),
                ctx.status(500),
                ctx.delay(300)
            )
        }

        const post = db.post.update({
            where: { id: { equals: req.params.id } },
            data: { title, body },
        })

        return res(ctx.json(post), ctx.delay(300))
    }),
    ...db.post.toHandlers('rest'),
] as const
