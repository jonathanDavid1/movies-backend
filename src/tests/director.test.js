const request = require("supertest")
const app = require("../app.js")

const director = {
    firstName:"Christopher",
    lastName: "Nolan",
    nationality: "United Kingdom",
    image: "www.christopher.com",
    birthday:"1991-04-01"
}

const URL_DIRECTOR = '/directors'

let directorId

test("POST -> 'URL_DIRECTOR' should return status code 201, res.boby to be defined and res.body.firstName= director.firstName", async () => {
        const res = await request(app)
        .post(URL_DIRECTOR)
        .send(director)

        directorId = res.body.id
        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(director.firstName)
})

test("Get -> 'URL_DIRECTOR' should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_DIRECTOR)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})

test("GetOne -> 'URL_DIRECTOR/:id' should return status code 200, res.body to be define and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
    .get(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("Put -> 'URL_DIRECTOR/:id' should return status code 200, res.body to be define and res.body.firstName = Christopher Edward", async() => {
    const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send({firstName: "Christopher Edward"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Christopher Edward")
})

test("Delete -> 'URL_DIRECTOR/:id' should retunr status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(204)
})