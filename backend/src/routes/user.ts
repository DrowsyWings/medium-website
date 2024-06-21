import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signUpInput } from "../zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const success = signUpInput.safeParse(body);

    if (!success) {
      c.text("Invalid input", 411);
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    // if(!user){
    //   c.json({
    //     message:"Something went wrong"
    //   })
    // }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    // window.localStorage.setItem("token", "Bearer " + token);

    return c.json({
      token: token,
    });
  } catch (e) {
    return c.text("Something went wrong", 403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "No such user found",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    // window.localStorage.setItem("token", "Bearer " + token);

    return c.json({
      token: token,
    });
  } catch (e) {
    return c.json({
      message: "Something went wrong",
    });
  }
});
