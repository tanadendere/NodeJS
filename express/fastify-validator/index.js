import Fastify from "fastify";
import { z } from "zod";

const fastify = Fastify({ logger: true });

fastify.addSchema({
  $id: "http://example.com/",
  type: "object",
  properties: {
    hello: {
      type: "string",
    },
  },
});

fastify.get("/", (req, res) => {
  res.send({ msg: "Hello world" });
});

fastify.route({
  method: "GET",
  url: "/users",
  schema: {
    querystring: {
      name: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      },
    },
  },
  handler: function (req, res) {
    res.send({ name: "Tana", age: 23 });
  },
});
const options = {
  schema: {
    request: {},
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
  },
};
fastify.get("/users/:id", options, (req, res) => {
  res.send({ name: "Tana" });
});

fastify.post("/users", {
  handler: (req, res) => {
    res.send({ name: "Tana" });
  },
  schema: {
    body: {
      type: "array",
      items: { $ref: "/properties/hello" },
    },
  },
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/^[a-zA-Z0-9]{8,}$/)
    .includes("$"),
});

fastify.post("/login", (req, res) => {
  try {
    loginSchema.parse(req.body);
    // do stuff here
    // return a token
    res.send("shjbjkdskdlsndkwdnledbjedbekdnlw");
  } catch (err) {
    fastify.log.error(err.message);
    res.code(400);
    res.send({ msg: "Invalid credentials" });
  }
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err.message);
    process.exit(1);
  }
  console.log("Up and running");
});
