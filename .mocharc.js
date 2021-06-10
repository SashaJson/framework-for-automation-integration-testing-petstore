module.exports = {
    require: [
        'ts-node/register',
        'dotenv/config'
    ],
    spec: './tests/**/*.test.ts',
    slow: 50000,
    timeout: 60000,
    reposter: 'mocha-multi-reposters',
    reporterOptions: ['configFile=reposterConfig.json']
}
