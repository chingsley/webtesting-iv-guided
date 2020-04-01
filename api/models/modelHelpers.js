const getInsertedIds = (lastId, insertedBulk) => {
  const result = [lastId];
  for (i = 1; i < insertedBulk.length; i++) {
    result.push(lastId - i);
  }
  return result;
};

module.exports = {
  getInsertedIds
};
