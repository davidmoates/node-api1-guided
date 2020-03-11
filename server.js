const express = require("express")
let users = require("./users")

const server = express()

// this is middleware that allows express
// to parse JSON request bodies. We'll talk about this more later.
server.use(express.json())

server.get("/", (req, res) => {
  res.json({ message: "h3110, w0r1d" })
})
server.get("/lambda", (req, res) => {
  // this will automatically return all the required response headers
  // and status code for a proper HTTP redirect
  res.redirect("https://lambdaschool.com")
})

server.get("/users", (req, res) => {
  // this is simulating a real database call
  res.json(users)
})

server.get("/users/:id", (req, res) => {
  // pull the ID value form the URL
  const id = req.params.id
  // find the specific user from our fake database with the ID
  const users = users.find(u => u.id == id)

  // a user was found with that ID
  if (user) {
    // return the data to the client
    res.json(user)
  // no user was found with that ID
  } else {
    // reutn an error to the client
    res.status(404).json({ message: "User not found"})
  }
})

server.post("/users", (req, res) => {
  // create a new fake user
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  }
  // simulate the actions of "inserting" to our database
  users.push(newUser)
  // 201 means success and a resource was created
  res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
  // finds the location of the user we're updating in the fake database
  const index = users.findIndex(u => u.id == req.params.id)
  // update that user's name if a new value is sent in the request body
  if (req.body.name) {
    users[index].name = req.body.name
  }
  // return the updated user date
  res.json(users[index])
})

server.delete("/users/:id", (req, res) => {
  // find the specific user from our fake database with the ID
  const user = users.find(u => u.id == req.params.id)

  // user exists in the database
  if (user) {
    users = users.filter(u => u.id != req.params.id)
    // res.json(users) could return and empty response

    // a succssful response with no response body
     res.status(204).end()
  // user does not exist in the database
} else {
  res.status(404).json({ message: "User not found"})
}
})

const port = 8080

// start the server on localhost at part 8080
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
