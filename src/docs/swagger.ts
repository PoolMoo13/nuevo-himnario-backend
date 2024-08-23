
import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

/**
 * API Config Info
 */

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de mi API Curso de Node REST",
    version: "1.0.1",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
    },
    {
      url: "https://afternoon-journey-32165.herokuapp.com/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    },
    schemas: {
      authLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      authRegister: {
        type: "object",
        required: ["email", "password", "age", "name"],
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "integer",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      hymnns: {
        type: "object",
        required: ["id", "title", "lyrics"],
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          lyrics: {
            type: "string",
          },
        },
        id: {
          type: "string",
        },
      },
    },
    storage: {
      type: "object",
      properties: {
        url: {
          type: "string",
        },
        filename: {
          type: "string",
        },
      },
    },
  },
};

/**
 * Opciones
 */
const options: OAS3Options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfigration = swaggerJsdoc(options);

export default openApiConfigration;
// module.exports = openApiConfigration;
