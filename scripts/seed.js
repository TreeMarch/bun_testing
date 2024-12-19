const { PrismaClient } = require("@prisma/client");
const { error } = require("elysia");

const client = new PrismaClient();

const postsToCreate = [
  {
    id: 1,
    title: "first post :V",
    content: "this is the first post",
  },
  {
    id: 2,
    title: "second post :)",
    content: "this is the second post",
  },
  {
    id: 3,
    title: "third post :$",
    content: "this is the third post",
  },
  {
    id: 4,
    title: "firth post ",
    content: "just another post ",
  },
];

const seed = async (posts) => {
  console.log("dang tao post ...");

  for (let i = 0; i < posts.length; i++) {
    console.log("creating post",posts[i])
    await client.post.upsert({
      where: { id: posts[i].id },
      update: posts[i],
      create: posts[i],
    });
  }
};

seed(postsToCreate)
  .then(() => {
    console.log("Created/Updated post successfully");
  })
  .catch((error) => {
    console.log(("Error", error));
  })
  .finally(() => {
    client.$disconnect();
    console.log("Disconnected Prisma Client,exiting ");
  });
