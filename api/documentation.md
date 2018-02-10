Sample requests:

    /api/posts/ returns all posts


    /api/users/ returns all users



    /api/users/:id
    /api/users/username/:username


    /api/replies/:parentId returns all replies


    /api/likes/  PUT
    {id, type: [post, reply], like: bool, username}
Sample responses:

Contains at minimum "data" or "errors"

{
  data:{
    users: [
      {
        _id: "12345",
        username: "jannekole",
        name: "Janne Kolehmainen"
      }
    ],
    posts: [
      {
        user:{
          userId: "12345",
          username: "jannekole",
          name: "Janne Kolehmainen"
        },
        _id: "kkl3k3k32",
        text: "post from api"
      }
    ],
    replies: [
      {
        parentId: "kkl3k3k32",
        user:{
          userId: "d12dsd45",
          username: "jannekole",
          name: "Janne Kolehmainen"
        }
        text: "reply from api"
      }
    ]
  }
}

{
  errors: [
    "internal error"
  ]
}
