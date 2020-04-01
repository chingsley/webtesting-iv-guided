const { getInsertedIds } = require("../../api/models/modelHelpers");

describe("getInsertedIds", () => {
  it("returns an array", () => {
    const result = getInsertedIds(10, ["a", "b", "c"]);
    expect(Array.isArray(result)).toBeTruthy();
  });

  it("returns the correct ids", () => {
    const result = getInsertedIds(10, ["a", "b", "c"]);
    expect(result).toEqual([10, 9, 8]);
  });
});
