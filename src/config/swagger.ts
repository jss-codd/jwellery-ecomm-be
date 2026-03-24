import swaggerJSDoc from "swagger-jsdoc";

import { env } from "./env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jewellery Backend API",
      version: "1.0.0",
      description: "API documentation for Jewellery backend service.",
    },
    servers: [
      {
        url: `${env.APP_BASE_URL}${env.API_PREFIX}`,
        description: "Primary API server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            category: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateProductInput: {
          type: "object",
          required: ["name", "price", "stock", "category"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 120 },
            price: { type: "number", minimum: 0.01 },
            stock: { type: "integer", minimum: 0 },
            category: { type: "string", minLength: 2, maxLength: 50 },
          },
        },
      },
    },
  },
  apis: ["src/routes/*.ts", "src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
