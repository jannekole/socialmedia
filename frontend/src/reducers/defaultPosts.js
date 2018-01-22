
let post0 = {
  parentId: "0",
  _id: "0",
  user: {
    name: {
      first: "Tommi",
      last: "Kolehmainen"
    },
    userName: "tommo"
  },
  text: "This HTML file is a template.  If you open it directly in the browser, you will see an empty page.      You can add webfonts, meta tags, or analytics to this file.    The build step will place the bundled scripts into the <body> tag.      To begin the development, run `npm start` or `yarn start`.To create a production bundle, use `npm run build` or `yarn build`.    "
};
let post = {
  parentId: "0",
  _id: "1",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "Eka postaus"
};

let post1 = {
  parentId: "0",
  _id: "2",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "Eka postaus"
};

let post2 = {
  parentId: "0",
  _id: "3",
  user: {
    name: {
      first: "Tommi",
      last: "Kolehmainen"
    },
    userName: "tommo"
  },
  text: "This HTML file is a template.  If you open it directly in the browser, you will see an empty page.      You can add webfonts, meta tags, or analytics to this file.    The build step will place the bundled scripts into the <body> tag.      To begin the development, run `npm start` or `yarn start`.To create a production bundle, use `npm run build` or `yarn build`.    "
};


let reply1 = {
  parentId: "1",
  _id: "11",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "1. vastaus postaukseen"
};
let reply2 = {
  parentId: "1",
  _id: "12",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "Vastaus postaukseen"
};
let reply3 = {
  parentId: "1",
  _id: "13",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "Vastaus postaukseen"
};
let reply4 = {
  parentId: "1",
  _id: "14",
  user: {
    name: {
      first: "Janne",
      last: "Kolehmainen"
    },
    userName: "jannekol"
  },
  text: "Vastaus postaukseen"
};

let jannekol = {
  items: [post, post1, reply1, reply2, reply3, reply4]
};
let _all = {
  items: [post0, post, post1, post2, reply1, reply2, reply3, reply4]
};

const state = {
  byUser: {
    _all,
    jannekol
  }
};

export default state;
