

const users = (state = {
  jannekol: {userName: "jannekol", name: "Janne Kolehmainen", followers: 284, following: 319},
  tommo: {userName: "tommo", name: "Tommi Kolehmainen"}
}, action) => {
  switch (action.type) {

    default:
      return state;
  }
};



export default users;
