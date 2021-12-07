var assert = require("assert");
const helperFunctions = require("../helperFunctions/helperFunctions");
const { algorithm, initVector, secretKey } = require("../resources/constants");
describe("Test helper functions", () => {
  const input = "abcde";
  it("should return correct hash for input", () => {
    const correctHash =
      "cb23dd4317a1e244dfffdb37412194357e55aa1efbf2fc1662f5bdfc28e37033";
    assert.equal(helperFunctions.createHash(input), correctHash);
  });
  it("should return correct encrypted data for input ", () => {
    const correctEncryptedObj = "d73c6e89d4e832";
    assert.equal(
      helperFunctions.encryptData(input, initVector, secretKey),
      correctEncryptedObj
    );
  });
  it("should return correct decrypted data for input ", () => {
    const correctEncryptedObj = "d73c6e89d4e832";
    assert.equal(
      helperFunctions.decryptData(correctEncryptedObj, initVector, secretKey),
      input
    );
  });
});
