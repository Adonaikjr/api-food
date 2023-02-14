module.exports = {
   //se o teste falhar ele para de executar
  bail: true,
  coverageProvider: 'v8',
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
}