import * as dotenv from 'dotenv'

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import routes from './routes'

dotenv.config()

const app = express()
createConnection()

app.use(bodyParser.json())
app.use(cors())
app.use(routes)

app.listen(3333, () => {
    console.log('Running Server!')
})
