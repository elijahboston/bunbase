// Funky import required due to this issue:
// https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/519
// @ts-ignore
import {getFunction} from "@google-cloud/functions-framework/testing";

describe("getSignedUploadUrl", () => {
  beforeAll(async () => {
    // load the module that defines HelloTests
    await import("./index");
  });
  it("is testable", () => {
    const func = getFunction("getSignedUploadUrl");
    const mockRequest = {
      body: {name: "test"},
    };

    const res = {
      send: (result: any) => {
        expect(result).toBe(`Hello test!`);
      },
      status: (code: number) => {
        expect(code).toBe(200);
        return res;
      },
    };

    func(mockRequest, res);
  });
});
