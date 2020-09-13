const server = require("../../api/index");
const req = require("supertest");

afterEach(() => {
  server.close();
});

describe("routes: index", () => {
  
  test("should respond no data found for blank param", async () => {
    const response = await req(server).get("/");
    expect(response.status).toEqual(404);
    expect(response.type).toEqual("text/plain");    
  });
  test("should respond no data found for invalid city", async () => {
    const response = await req(server).get("/jgfgfhgf");
    expect(response.status).toEqual(404);
    expect(response.type).toEqual("text/plain");    
  });
  test("should respond as expected for valid city", async () => {
    const response = await req(server).get("/pune");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");   
  });

});