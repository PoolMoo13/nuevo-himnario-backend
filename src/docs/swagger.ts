import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion del API de Himnos de jovenes",

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
    hymns: {
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
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfigration = swaggerJsdoc(options);
export default openApiConfigration;