import { Router } from "express"

import { simulateLoan, requestedLoan } from "./services/homeService"

const routes = Router()

routes.post("/simulate", simulateLoan)
routes.put("/simulate/:loanId", requestedLoan)

export default routes
