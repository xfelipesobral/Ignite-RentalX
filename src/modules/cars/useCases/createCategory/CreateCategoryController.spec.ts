import { Connection } from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 } from 'uuid'

import request from 'supertest' 

import { app } from '@shared/infra/http/app'

import createConnection from '@shared/infra/typeorm'

let connection: Connection
describe('Create Category Controller', () => {

    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()

        const password = await hash('admin', 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
             values ('${v4()}', 'admin', 'admin@test.com', '${password}', true, 'now()', 'XXXXX')`
        )
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@test.com',
            password: 'admin'
        })

        const { token } = responseToken.body

        const response = await request(app).post('/categories').send({
            name: 'Category Supertest',
            description: 'Category Supertest'
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })

    it('should not be able to create a new category with name exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@test.com',
            password: 'admin'
        })

        const { token } = responseToken.body

        const response = await request(app).post('/categories').send({
            name: 'Category Supertest',
            description: 'Category Supertest'
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
    })
})