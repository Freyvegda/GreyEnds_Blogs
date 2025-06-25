import { createBlog, createComment, updateBlogInput } from "frey_medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreateComment } from "frey_medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const tagsToConnectOrCreate = body.tags?.map((tag: string) => ({
        where: { name: tag },
        create: { name: tag }
    })) || [];

   const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            tags: {
                connectOrCreate: tagsToConnectOrCreate
            }
        },
        include: {    // Add this to include author details
            author: {
                select: {
                    name: true,
                    catchPhrase: true,
                }
            },
            tags: true
        }
    })

    return c.json({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        publishedDate: blog.publishedDate, 
        author: {
            name: blog.author.name,
            catchPhrase: blog.author.catchPhrase
        }
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            publishedDate: true,
            author: {
                select: {
                    name: true,
                }
            },
            tags: {
                select: { name: true }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true,
                        catchPhrase: true,
                    }
                },
                tags: {
                    select: { name: true }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})

blogRouter.post('/comment', async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch (e) {
    c.status(400);
    return c.json({
      message: "Invalid JSON format"
    });
  }

  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: userId,
        blogId: body.blogId
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });

    return c.json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error creating comment",
      error: (e as Error).message
    });
  }
});



blogRouter.get('/comment/:blogId', async (c)=>{
    const blogId = c.req.param("blogId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const comments = await prisma.comment.findMany({
            where: {blogId},
            orderBy: {createdAt: "desc"},
            select:{
                id: true,
                content: true,
                createdAt: true,
                author: {
                    select:{
                        name : true
                    }
                }
            }
        })

        return c.json({comments})
    }

    catch(e){
        c.status(500);
        c.json({
            message: "Error retrieving the comments"
        })
    }
})