const merge = (newObjects, oldObjects) => {

  var objects = [...newObjects];
  var oldLength = oldObjects.length;
  var newLength = newObjects.length;
  for (let i = 0; i < oldLength; i++) {
    let isDuplicate = false;
    for (let j = 0; j < newLength; j++) {
      if (oldObjects[i]._id === newObjects[j]._id) {
        objects[j] = Object.assign({}, oldObjects[i], newObjects[j]);
        isDuplicate = true;
        break;
      }

    }
    if (!isDuplicate) {
      objects = objects.concat(oldObjects[i]);
    }
  }
  return objects;
};

export default merge;
