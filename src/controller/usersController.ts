import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Users from '../entity/users'

export const getUsers = async (req: Request, resp: Response) => {
    const users = await getRepository(Users).find()
    return resp.json(users)
}

export const findUsers = async (data: string) => {
    const user = await getRepository(Users).findOne({ where: { cpf: data } })
    const result = user ? user.id : null
    return result
}

export const createUser = async (data: any) => {
    const user = await getRepository(Users).save(data)
    const result = user ? user.id : null
    return result
}
