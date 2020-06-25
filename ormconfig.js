module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,

    synchronize: true,
    logging: false,
    entities: ['build/entity/**/*.js'],
    cli: {
        entitiesDir: 'src/entity',
    },
}
