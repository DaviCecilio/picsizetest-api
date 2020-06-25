import { Router } from 'express'

import { getLoans } from './controller/loansController'
import { getUsers } from './controller/usersController'
import { simulateLoan, requestedLoan } from './services/homeService'

const routes = Router()

// controller - VERIFY BD
routes.get('/loans', getLoans)
routes.get('/users', getUsers)

// services *WEB-APP
routes.post('/simulate', simulateLoan)
routes.put('/simulate/:loanId', requestedLoan)

export default routes
