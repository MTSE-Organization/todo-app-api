import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TodosService } from '@/modules/todos/todos.service';
import { AccountService } from '@/modules/account/account.service';

describe('TodosController - POST /todos/create (login to get token)', () => {
  let app: INestApplication;
  let todosService: TodosService;
  let accountService: AccountService;
  let tokenUser: string;

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

    todosService = app.get(TodosService);
    accountService = app.get(AccountService);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123654' })
      .expect(201);

    tokenUser = loginRes.body?.data?.token as string;
    expect(typeof tokenUser).toBe('string');
    expect(tokenUser.length).toBeGreaterThan(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('TC_TODO_CREATE_0001', async () => {
    jest
      .spyOn(todosService, 'create')
      .mockResolvedValueOnce({ message: 'Create todo successfully' } as any);

    const body = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Create todo successfully/i)
      })
    );
  });

  it('TC_TODO_CREATE_0002', async () => {
    const body = { dueDate: '2030-01-01T00:00:00Z' };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(
            /title.*(cannot be empty|cannot be null or empty|must not be empty)/i
          )
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0003', async () => {
    const body = { title: 'Buy #Milk', dueDate: '2030-01-01T00:00:00Z' };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/title.*must not contain special characters/i)
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0004', async () => {
    const body = { title: 'Buy Milk' };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(
            /dueDate.*(cannot be null or empty|cannot be empty)/i
          )
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0005', async () => {
    const body = { title: 'Buy Milk', dueDate: '2000-01-01T00:00:00Z' };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/dueDate.*cannot be in the past/i)
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0006', async () => {
    const body = { title: 'Buy Milk', dueDate: 'note dueDate' };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/dueDate.*must be a valid date/i)
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0007', async () => {
    const body = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .send(body)
      .expect(401);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        message: 'Unauthorized',
        code: expect.stringMatching(/^ERROR-/)
      })
    );
  });

  it('TC_TODO_CREATE_0008', async () => {
    const body = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', 'Bearer invalid token')
      .send(body)
      .expect(401);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        message: expect.stringMatching(/Unauthorized|Invalid token/i),
        code: expect.stringMatching(/^ERROR-/)
      })
    );
  });

  it('TC_TODO_CREATE_0009', async () => {
    jest.spyOn(accountService, 'findById').mockImplementationOnce(async () => {
      throw new NotFoundException('Account not found');
    });

    const body = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.stringMatching(/Account not found/i)
      })
    );
  });

  it('TC_TODO_CREATE_0011', async () => {
    const body: any = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00Z',
      extraField: 'abc'
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/property.*extraField.*should not exist/i)
        ])
      })
    );
  });

  it('TC_TODO_CREATE_0012', async () => {
    jest
      .spyOn(todosService, 'create')
      .mockResolvedValueOnce({ message: 'Create todo successfully' } as any);

    const nowPlus1s = new Date(Date.now() + 1000).toISOString();

    const body = {
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: nowPlus1s
    };

    const res = await request(app.getHttpServer())
      .post('/todos/create')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Create todo successfully/i)
      })
    );
  });
});
