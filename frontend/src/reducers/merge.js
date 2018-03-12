const areEqual = (obj1, obj2) => {
  return (obj1._id && obj1._id === obj2._id) || (obj1.followerId && obj1.followingId && (obj1.followerId === obj2.followerId) && (obj1.followingId === obj2.followingId));
};
const isInArray = (obj1, array) => {
  return !!array.find((obj2)=> areEqual(obj1, obj2));
};
const merge = (oldObjects, newObjects, remove=false) => {
  let oldLength = oldObjects.length;
  let newLength = newObjects.length;
  let objects;
  if (remove) {
    objects = oldObjects.filter((object) => {

      return !isInArray(object, newObjects);

    });
  } else {
    objects = [...newObjects];
    for (let i = 0; i < oldLength; i++) {
      let isDuplicate = false;
      for (let j = 0; j < newLength; j++) {
        if (areEqual(oldObjects[i], newObjects[j])) {
          objects[j] = Object.assign({}, oldObjects[i], newObjects[j]);
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        objects = objects.concat(oldObjects[i]);
      }
    }
  }

  return objects;
};

export default merge;
