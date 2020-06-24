import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'

import Users from './users'

@Entity()
class Loans {
    @PrimaryGeneratedColumn()
    id: number

    @Column('decimal')
    initialValue: number

    @Column('int')
    month_quant: number

    @Column('decimal')
    interests: number

    @Column('decimal')
    monthValue: number

    @Column('decimal')
    totalValue: number

    @Column('boolean', { default: false })
    requested: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne((type) => Users, (loans) => Loans, { eager: true })
    user: Users
}

export default Loans
