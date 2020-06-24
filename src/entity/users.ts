import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'

import Loans from './loans'

@Entity()
class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 14, unique: true })
    cpf: string

    @Column('char', { length: 2 })
    uf: string

    @Column('date')
    birthday: Date

    @CreateDateColumn()
    createdAt: Date

    @OneToMany((type) => Loans, (user) => Users)
    loans: Loans[]
}

export default Users
