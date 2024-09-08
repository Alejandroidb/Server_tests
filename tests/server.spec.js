const request = require("supertest");
const server = require("../index");

describe("CRUD operations of cafes", () => {
  it("Return 200 and type of data and object", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(typeof response.body[0]).toBe("object");
  });

  it("404 when deleting unknown id object", async () => {
    const nonExistentId = 9999;
    const response = await request(server)
      .delete(`/cafes/${nonExistentId}`)
      .set("Authorization", "Bearer testToken");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No se encontró ningún café con ese id");
  });

  it("Adding a new product", async () => {
    const newCafe = {
      id: Math.floor(Math.random() * 999),
      nombre: "Test cafe",
    };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(newCafe);
  });

  it("Updating cafe with wrong data", async () => {
    const updatedCafe = { id: 999, nombre: "Updated cafe" };
    const response = await request(server).put("/cafes/:id").send(updatedCafe);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "El id del parámetro no coincide con el id del café recibido"
    );
  });
});
