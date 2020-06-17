const auth = require('./auth-router')
const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')


describe('register', () => {
    it('creates a new user', async () => {
        afterAll(async () => {
           await db('users').truncate()
            })
        db('users').insert({username:'test01',password:'test02'})
        .then(async resp => {
            console.log(resp)
             const users = await db('users')
            //  g
             expect(users).toHaveLength(3)
        })
        // const users = await db('users')
        // expect(users).toHaveLength(1)
    }); 
})

describe('register', () => {
    it('logs new user in', async () => {
        afterAll(async () => {
           await db('users').truncate()
            })
        request(server).post('/register')
        .send({username:'test01',password:'test02'})
        .expect('Content-Type',/json/)
        .expect(201)
        
    }); 
})

describe('login',() => {
    it('logs user in if they exist',() => {
        request(server).post('/login')
        .send({username:'test01',password:'test02'})
        .then(res => {
            expect(res.status).toBe(200)
        })
        .catch(err => {
            console.log(err)
        })
    })
})

describe('math',() => {
    it('adds numbers',() => {
        expect(2 + 2).toBe(4)
    })
})