const app = require("./app");
const axios = require("axios");

describe("web testing", () => {
  let server;
  const PORT = process.env.PORT || 3000;
  const userData = {
    email: "test@example.com",
    password: "testpassword",
  };

  beforeEach(() => {
    server = app.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  it("GET contacts testing", async () => {
    const resp = await axios.get(`http://localhost:${PORT}/api/contacts`);
    expect(resp.data.data).toEqual(expect.any(Array));
    expect(resp.data.status).toBe("success");
    expect(resp.data.code).toBe(200);
  });

  it("POST signup testing", async () => {
    try {
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
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  it("POST login testing", async () => {
    try {
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
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
});
