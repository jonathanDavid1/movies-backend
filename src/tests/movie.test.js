require("../models")
const request = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

const movie = {
    name: "FastAndFurious",
    image: "www.fastandfurious.com",
    synopsis:"lorem20",
    releaseYear: 2004
}
const URL_MOVIE = "/movies"

let movieId


test("POST -> 'URL_MOVIE' should return status code 201, res.boby to be defined and res.body.name= movie.name", async () => {
    const res = await request(app)
    .post(URL_MOVIE)
    .send(movie)

    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})


test("Get -> 'URL_MOVIE' should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_MOVIE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    
    expect(res.body[0].actors.length).toBe[0]
    expect(res.body[0].directors.length).toBe[0]
    expect(res.body[0].genres.length).toBe[0]
    
})

test("GetOne -> 'URL_MOVIE/:id' should return status code 200, res.body to be define and res.body.name = movie.name", async () => {
    const res = await request(app)
    .get(`${URL_MOVIE}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
    expect(res.body.actors.length).toBe[0]
    expect(res.body.directors.length).toBe[0]
    expect(res.body.genres.length).toBe[0]
})

test("Put -> 'URL_MOVIE/:id' should return status code 200, res.body to be define and res.body.name = FastAndFurios2", async() => {
    const res = await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send({name: "FastAndFurios2"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("FastAndFurios2")
})
test("POST -> 'URL_MOVIE/:id/actors' should return status code 200, res.body to be defined..", async () =>{
    const actor = await Actor.create({
        firstName:"vin",
        lastName: "Diesel",
        nationality: "USA",
        image: "www.vin.com",
        birthday:"1991-01-01"
    })
    const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/actors`)
    .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body[0].id).toBe(actor.id)
    
    await actor.destroy()
})

test("Post -> 'URL_MOVIE/:id/director' should return status code 200, res.body to be defined...", async () => {
    const director = await Director.create({
        firstName:"Christopher",
        lastName: "Nolan",
        nationality: "United Kingdom",
        image: "www.christopher.com",
        birthday:"1991-04-01"
    })
    const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/directors`)
    .send([director.id])


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body[0].id).toBe(director.id)

    await director.destroy()
})

test("Post -> 'URL_MOVIE/:id/director' should return status code 200, res.body to be defined ... ", async () => {
    const genre = await Genre.create({
        name: "Action"
    })
    const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/genres`)
    .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body[0].id).toBe(genre.id)
    
    await genre.destroy()
})
test("Delete -> 'URL_MOVIE/:id' should retunr status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_MOVIE}/${movieId}`)

    expect(res.status).toBe(204)
})