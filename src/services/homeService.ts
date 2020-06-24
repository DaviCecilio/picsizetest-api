import { Request, Response } from 'express'

import { createUser, findUsers } from '../controller/usersController'
import { createLoan, loanRequested } from '../controller/loansController'

export const simulateLoan = async (req: Request, resp: Response) => {
    try {
        const { user, loan } = req.body

        const verifyUser = await findUsers(user.cpf)

        let userId: any = ''
        verifyUser ? (userId = verifyUser) : (userId = await createUser(user))

        const loanDetail: any = await createLoan({ id: userId, uf: user.uf }, loan)

        return resp.status(200).json(loanDetail)
    } catch (err) {
        console.log('Error ', err.message)
        return resp.status(400).send()
    }
}

export const requestedLoan = async (req: Request, resp: Response) => {
    try {
        const { loanId } = req.params

        const loanAlter = await loanRequested(loanId)

        return resp.status(200).json(loanAlter)
    } catch (err) {
        console.log('Error ', err.message)
        return resp.status(400).send()
    }
}
