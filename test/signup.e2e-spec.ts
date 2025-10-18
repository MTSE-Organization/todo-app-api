import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
      })
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('TC_SIGNUP_0001', async () => {
    const uniqueEmail = `user${Date.now()}@gmail.com`;
    const body = {
      email: uniqueEmail,
      password: '12345678',
      confirmPassword: '12345678'
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(body)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        result: true,
        message: 'Register successfully'
      })
    );
  });

  it('TC_SIGNUP_0002', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ password: '12345678', confirmPassword: '12345678' })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0003', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: null, password: '12345678', confirmPassword: '12345678' })
      .expect(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0004', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: '', password: '12345678', confirmPassword: '12345678' })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0005', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test',
        password: '12345678',
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0006', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user@gmail.com',
        password: '12345678',
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Account already exists',
        code: 'ERROR-ACCOUNT-0001'
      })
    );
  });

  it('TC_SIGNUP_0007', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0008', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: null,
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0009', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '',
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0010', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '1234567',
        confirmPassword: '12345678'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0011', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '1234568'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0012', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '1234568',
        confirmPassword: null
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0013', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '1234568',
        confirmPassword: ''
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  it('TC_SIGNUP_0014', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user-test@gmail.com',
        password: '1234568',
        confirmPassword: '12345677'
      })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Data not suitable'
      })
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
