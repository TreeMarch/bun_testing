import { Elysia, t } from "elysia";
import { createPost, deletePost, getPosts, updatePost } from "./handlers";
// localhost:3000/api/posts

const postRoutes = new Elysia({ prefix: "/posts" })
  .get("/", () => getPosts())
  .get("/:id", ({ params: { id } }) => getPosts(id), {
    //validate - chi cho phep du lieu la dang so
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/", ({ body }) => createPost(body), {
    //validate - title toi thieu 5 ky tu va toi da 50 - content cung noi dung
    body: t.Object({
      title: t.String({
        minLength: 5,
        maxLength: 50,
      }),
      content: t.String({
        minLength: 3,
        maxLength: 50,
      }),
    }),
  })
  .patch("/:id", ({ params: { id } }, body) => updatePost(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object(
      {
        title: t.Optional(
          t.String({
            minLength: 5,
            maxLength: 50,
          })
        ),
        content: t.Optional(
          t.String({
            minLength: 5,
            maxLength: 50,
          })
        ),
      },
      {
        minProperties: 1,
      }
    ),
  })
  .delete("/", ({ body }) => deletePost(body), {
    body: t.Object({
      id: t.Numeric(),
    }),
  });

export default postRoutes;
