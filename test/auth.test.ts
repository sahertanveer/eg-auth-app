import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust the path as needed

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your AppModule
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) - should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'Test123!',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userData)
      .expect(201);

    const { message, user } = response.body;

    expect(message).toBe('Authentication successful');
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    // Add more assertions for user properties as needed
  });

  it('/auth/signin (POST) - should authenticate a user', async () => {
    const loginData = {
      email: 'test@example.com', // Use the email from the previous test
      password: 'Test123!',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginData)
      .expect(200);

    const { message, user } = response.body;

    expect(message).toBe('Authentication successful');
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.email).toBe(loginData.email);
    expect(user.name).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
