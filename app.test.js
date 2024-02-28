const app = require("./app");
const axios = require("axios");

describe("web testing", () => {
  let server;
  const PORT = process.env.PORT || 3000;

  // app.listen(PORT);
  beforeAll(async () => {
    server = app.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });
  const userData = {
    email: "test@example.com",
    password: "testpassword",
  };
  const wrongUserData = {
    email: "wrong@example.com",
    password: "wrongpassword(FAILL)",
  };

  it("GET contacts testing", async () => {
    const resp = await axios.get(`http://localhost:${PORT}/api/contacts`);
    expect(resp.data.data).toEqual(expect.any(Array));
    expect(resp.data.status).toBe("success");
    expect(resp.data.code).toBe(200);
  });

  it("POST signup testing", async () => {
    const resp = await axios.post(
      `http://localhost:${PORT}/api/users/signup`,
      userData
    );
    expect(resp.data.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
      })
    );
    expect(resp.data.status).toBe("success");
    expect(resp.data.code).toBe(201);
  });

  it("POST signup testing (Email in use)", async () => {
    const error = await axios.post(
      `http://localhost:${PORT}/api/users/signup`,
      wrongUserData
    );
    expect(error.data.status).toBe("error");
    expect(error.data.code).toBe(409);
  });

  it("POST login testing", async () => {
    const resp = await axios.post(
      `http://localhost:${PORT}/api/users/login`,
      userData
    );
    expect(resp.data.data).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
    expect(resp.data.status).toBe("success");
    expect(resp.data.code).toBe(200);
  });

  it("POST login testing (Password is wrong)", async () => {
    const error = await axios.post(
      `http://localhost:${PORT}/api/users/login`,
      wrongUserData
    );
    expect(error.data.status).toBe("error");
    expect(error.data.code).toBe(401);
  });
});
