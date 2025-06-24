import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput, updateUserInput } from "frey_medium-common";
import { verify } from 'hono/jwt';


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
          catchPhrase: body.catchPhrase,
        }
      })
      const jwt = await sign({
        id: user.id,
        name: user.name
      }, c.env.JWT_SECRET);
  
      return c.json({ jwt })
    } catch(e) {
      c.status(411);
      return c.json({ message: 'Invalid' })
    }
  })
  
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        }
      })
      if (!user) {
        c.status(403);
        return c.json({
          message: "Incorrect creds"
        })
      }
      const jwt = await sign({
        name: user.name,
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.json({ jwt })
    } catch(e) {
      c.status(411);
      return c.json({ message: 'Invalid' })
    }
  })
  

userRouter.put('/update', async (c)=>{
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
  let payload: { id: string; [key: string]: unknown };
  const token= authHeader.split(" ")[1];
    try{
      payload = await verify(token, c.env.JWT_SECRET) as { id: string; [key: string]: unknown };
    }
    catch(e){
      c.status(403)
      return c.json({message: "invalid token"});
    }

    const body= await c.req.json();
    const { success } = updateUserInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Inputs not correct" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
      const updateUser= await prisma.user.update({
        where: {id: payload.id},
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          catchPhrase: body.catchPhrase,
        }
      });
      return c.json({
        message: "User updated successfully",
        user: {
          id: updateUser.id,
          name: updateUser.name,
          email: updateUser.email,
          catchPhrase: body.catchPhrase,
        }
      })
    }
    catch(e){
      c.status(500);
      return c.json({ message: "Update failed" });
    }
})