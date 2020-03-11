const express = require("express")
const users = require("./users")

const server = express()

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
  const user = users.find(u => u.id == id)

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

const port = 8080

// start the server on localhost at part 8080
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
