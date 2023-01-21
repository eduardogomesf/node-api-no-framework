import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query

            let filters = {}

            if (search) {
                filters = {
                    name: search,
                    email: search
                }
            }

            const users = database.select('users', filters)

            return res
                .setHeader('Content-type', 'application/json')
                .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { email, name } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user)

            return res.writeHead(201).end('Create a new user')
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            database.delete('users', id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body
            database.update('users', id, { name, email })
            return res.writeHead(204).end()
        }
    },
]