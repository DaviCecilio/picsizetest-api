import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Loans from '../entity/loans'

export const getLoans = async (req: Request, resp: Response) => {
    const loans = await getRepository(Loans).find()
    return resp.json(loans)
}

export const createLoan = async (userData: any, loanData: any) => {
    let interestLoan = 0

    switch (userData.uf) {
        case 'MG':
            interestLoan = 0.01
            break

        case 'SP':
            interestLoan = 0.008
            break

        case 'RJ':
            interestLoan = 0.009
            break

        case 'ES':
            interestLoan = 0.0111
            break

        default:
            interestLoan = 1
            break
    }

    const valueMonth: number = (loanData.valueRequired / loanData.month_quant) * (1 + interestLoan)
    const valueTotal: number = valueMonth * loanData.month_quant

    const newLoan = {
        initialValue: loanData.valueRequired,
        month_quant: loanData.month_quant,
        interests: interestLoan,
        monthValue: valueMonth,
        totalValue: valueTotal,
        requested: false,
        user: { id: userData.id },
    }

    const loan: any = await getRepository(Loans).save(newLoan)

    return loan
}

export const loanRequested = async (loanId) => {
    try {
        await getRepository(Loans).update(loanId, { requested: true })
        return {
            type: 'success',
            message: 'Empréstimo realizado com sucesso',
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Algo deu Errado!',
        }
    }
}
