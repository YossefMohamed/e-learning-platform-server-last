import request from "supertest";

import { app } from "../../../app";

test("testing for user signup returns a 201 on successful", async () => {
  const response: any = request(app)
    .post("/api/users/signup")
    .send({
      name: "yossef",
      lastName: "mohamed",
      email: "yossefaa2s@ggmail.com",
      gender: "male",
      password: "12345678",
    })
    .expect(201);
});

test("testing for invaled user email on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "123456781",
    })
    .expect(400);
});

test("testing for invaled user password length on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "12",
    })
    .expect(400);
});

test("testing for invaled gender on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "121212121212",
    })
    .expect(400);
});

test("testing for no data sent on signup returns a 400 on unsuccessful", async () => {
  return request(app).post("/api/user/signup").send({}).expect(404);
});

test("testing for no email or password sent on signup returns a 404 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
    })
    .expect(400);
});

test("disallows duplicate emails", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "test@test.com",
      password: "12345678",
      gender: "male",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "test@test.com",
      password: "12345678",
      gender: "male",
    })
    .expect(400);
});
