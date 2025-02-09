import request from "supertest";
import app from "../app.js";

describe("Test API Covid", () => {
    it("GET /api/covid19 devrait retourner des données", async () => {
        const res = await request(app).get("/api/covid19?start_date=2024-01-01&end_date=2024-01-07");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("POST /api/covid19/add-data devrait ajouter une entrée", async () => {
        const res = await request(app).post("/api/covid19/add-data").send({
            date_reported: "2024-02-01",
            confirmed_cases: 20000,
            deaths_reported: 300,
            recovered_cases: 18000,
            active_cases: 1700,
            new_cases: 200,
            new_deaths: 5,
            new_recovered: 150,
            deaths_per_100_cases: 1.5,
            recovered_per_100_cases: 90
        });
        expect(res.statusCode).toBe(201);
    });

    it("PUT /api/covid19/update-data/:id devrait modifier une entrée", async () => {
        const res = await request(app).put("/api/covid19/update-data/1").send({
            confirmed_cases: 25000
        });
        expect(res.statusCode).toBe(200);
    });

    it("DELETE /api/covid19/delete-data/:id devrait supprimer une entrée", async () => {
        const res = await request(app).delete("/api/covid19/delete-data/1");
        expect(res.statusCode).toBe(200);
    });
});
