
const request = require("supertest")
const app = require("../app")

const genre = {
    name: "Action"
}
const URL_GENRE = "/genres"

let genreId


test("POST -> 'URL_GENRE' should return status code 201, res.boby to be defined and res.body.name= genre.name", async () => {
    const res = await request(app)
    .post(URL_GENRE)
    .send(genre)

    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})


test("Get -> 'URL_GENRE' should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_GENRE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})

test("GetOne -> 'URL_GENRE/:id' should return status code 200, res.body to be define and res.body.name = genre.name", async () => {
    const res = await request(app)
    .get(`${URL_GENRE}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("Put -> 'URL_GENRE/:id' should return status code 200, res.body to be define and res.body.name = science", async() => {
    const res = await request(app)
    .put(`${URL_GENRE}/${genreId}`)
    .send({name: "science"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("science")
})

test("Delete -> 'URL_GENRE/:id' should retunr status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_GENRE}/${genreId}`)

    expect(res.status).toBe(204)
})