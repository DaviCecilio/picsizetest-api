import { getRepository } from 'typeorm'
import Loans from '../entity/loans'
import { Request, Response } from 'express'

export const getLoans = async (req: Request, resp: Response) => {
    const loans = await getRepository(Loans).find()
    return resp.json(loans)
}

export const createLoan = async (userData: any, loanData: any) => {
    let _interestLoan: number = 0

    switch (userData.uf) {
        case 'MG':
            _interestLoan = 0.01
            break

        case 'SP':
            _interestLoan = 0.008
            break

        case 'RJ':
            _interestLoan = 0.009
            break

        case 'ES':
            _interestLoan = 0.0111
            break

        default:
            _interestLoan = 1
            break
    }

    const _monthValue: number =
            (loanData.valueRequired / loanData.month_quant) * (1 + _interestLoan),
        _totalValue: number = _monthValue * loanData.month_quant

    const newLoan = {
        initialValue: loanData.valueRequired,
        month_quant: loanData.month_quant,
        interests: _interestLoan,
        monthValue: _monthValue,
        totalValue: _totalValue,
        requested: false,
        user: { id: userData.id },
    }

    const loan: any = await getRepository(Loans).save(newLoan)

    return loan
}

export const loanRequested = async (loanId) => {
    try {
        await getRepository(Loans).update(loanId, { requested: true })
        return 'Empréstimo realizado com sucesso'
    } catch (error) {
        return 'Response.status(400).send();'
    }
}
