import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import cors from 'cors'

require('dotenv').config();
const app = express()
const port = 3000

interface Map {
    [key: string]: string | undefined
  }

const users: Map = {
    "admin": "123456",
    "devops": "123456",
    "developer": "123456"
}

const tokenSecret = process.env.TOKEN_SECRET as string
let refreshToken: string

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World - simple api with JWT!')
})

app.post(
  "/token",
  verifyCredentials,
  function (req, res) {
    const expTime = req.body.exp || 60
    const user = req.body.user as string;
    let role = "developer";
    if(user.includes("admin")) role="admin"
    if(user.includes("devops")) role="devops"

    const token = generateToken(+expTime, role, user)
    refreshToken = generateToken(60 * 60, role, user)
    res.status(200).send({ token, refreshToken })
  }
)
app.post(
  "/refreshToken",
  function (req, res) {
    const refreshTokenFromPost = req.body.refreshToken
    if (refreshToken !== refreshTokenFromPost) {
      res.status(400).send('Bad refresh token!')
    }
    const expTime = req.headers.exp || 60
    const decode = jwt.verify(refreshTokenFromPost,tokenSecret) as JwtPayload
    const token = generateToken(+expTime, decode.role, decode.login)
    refreshToken = generateToken(60 * 60, decode.role, decode.login)
    setTimeout(() => {
      res.status(200).send({ token, refreshToken })
    }, 3000)
  }
)
app.get(
  "/protected",
  verifyToken,
  (req, res) => {
    setTimeout(() => {
      res.status(200).send(`you have access`)
    }, 1000)
  }
)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateToken(expirationInSeconds: number, role: string, login: string) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
  const token = jwt.sign({ exp, role: role, login: login}, tokenSecret, { algorithm: 'HS256' })
  return token
}

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) return res.sendStatus(403)

  jwt.verify(token, tokenSecret, (err: any, decoded: any) => {
    if (err) {
      console.log(err)
      return res.status(401).send(err.message)
    }
    if(!decoded.role || decoded.role != "admin") return res.status(403).send("no user permission")
    next()
  })
}

function verifyCredentials(req: any, res: any, next: any){
    console.log("req")
    const login = req.body.user as string;
    const password = req.body.password as string;

    if(!Object.keys(users).includes(login) || !(users[login] == password)){
        return res.status(403).send("login or password is invalid")
    }
    next()
}