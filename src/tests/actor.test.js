/* require('../models') */
const request = require('supertest') 
const app = require('../app')

const actor = {
    firstName:"vin",
    lastName: "Diesel",
    nationality: "USA",
    image: "www.vin.com",
    birthday:"1991-01-01"
}
const URL_ACTOR = '/actors'

let actorId

test("POST -> 'URL_ACTOR' should return status code 201, res.boby to be defined and res.body.firstName= actor.firstName", async () => {
        const res = await request(app)
        .post(URL_ACTOR)
        .send(actor)

        actorId = res.body.id
        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(actor.firstName)
})

test("Get -> 'URL_ACTOR' should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_ACTOR)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})

test("GetOne -> 'URL_ACTOR/:id' should return status code 200, res.body to be define and res.body.firstName = actor.firstName", async () => {
    const res = await request(app)
    .get(`${URL_ACTOR}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("Put -> 'URL_ACTOR/:id' should return status code 200, res.body to be define and res.body.firstName = Paul", async() => {
    const res = await request(app)
    .put(`${URL_ACTOR}/${actorId}`)
    .send({firstName: "Paul"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Paul")
})

test("Delete -> 'URL_ACTOR/:id' should retunr status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_ACTOR}/${actorId}`)

    expect(res.status).toBe(204)
})