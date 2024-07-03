/* eslint-disable require-await */
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const swaggerUi = require('swagger-ui-express')
const { name, version, description } = require('./package.json')
const router = require('./routes/index')

module.exports = async (app, port, env) => {
   const doc = {
      info: {
         title: name,
         description,
         version
      },
      components: {
         securitySchemes: {
            BasicAuth: {
               type: 'http',
               scheme: 'basic',
            }
         }
      },
      security: [
         {
            BasicAuth: [],
         },
      ],
      host: `localhost:${port}`,
      schemes: env.toLowerCase() === 'local' ? ['http'] : ['https']
   }
   const outputFile = './bin/swagger.json'
   const endpointsFiles = ['./app.js']

   return swaggerAutogen(outputFile, endpointsFiles, doc).then((res) => {
      router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(res.data))
   })
}