var secondsFromObjectId = function (objectId) {
  return parseInt(objectId.substring(0, 8), 16);
};

//order should be 1 or -1
const sortPostsByDate = function(posts, order=1) {
  return posts.sort((a, b) => {
    return order * (secondsFromObjectId(b._id) - secondsFromObjectId(a._id));});
};

export default sortPostsByDate;
