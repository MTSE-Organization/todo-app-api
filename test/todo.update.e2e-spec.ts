// test/todo.update.e2e-spec.ts
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

describe('TodosController - PUT /todos/update (login to get token)', () => {
  let app: INestApplication;
  let todosService: TodosService;
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

  it('TC_TODO_UPDATE_0001', async () => {
    jest
      .spyOn(todosService, 'update')
      .mockResolvedValueOnce({ message: 'Update todo successfully' } as any);

    const body = {
      id: 1,
      title: 'Buy Milk Update',
      description: 'Get from store - updated',
      dueDate: '2030-02-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Update todo successfully/i)
      })
    );
  });

  it('TC_TODO_UPDATE_0002', async () => {
    jest
      .spyOn(todosService, 'update')
      .mockResolvedValueOnce({ message: 'Update todo successfully' } as any);

    const body = { id: 1, title: 'Buy Milk Update' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Update todo successfully/i)
      })
    );
  });

  it('TC_TODO_UPDATE_0003', async () => {
    jest
      .spyOn(todosService, 'update')
      .mockResolvedValueOnce({ message: 'Update todo successfully' } as any);

    const body = { id: 1, description: 'Get from store - updated' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Update todo successfully/i)
      })
    );
  });

  it('TC_TODO_UPDATE_0004', async () => {
    jest
      .spyOn(todosService, 'update')
      .mockResolvedValueOnce({ message: 'Update todo successfully' } as any);

    const body = { id: 1, dueDate: '2030-02-01T00:00:00Z' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.stringMatching(/Update todo successfully/i)
      })
    );
  });

  it('TC_TODO_UPDATE_0005', async () => {
    const body = { title: 'Buy Milk Update' }; // KHÔNG gửi id

    const res = await request(app.getHttpServer())
      .put('/todos/update')
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
            /id.*(cannot be null or empty|must not be empty|must be a bigint)/i
          )
        ])
      })
    );
  });

  it('TC_TODO_UPDATE_0006', async () => {
    const body = { id: 1, title: 'Buy Milk Update###' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
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

  it('TC_TODO_UPDATE_0007', async () => {
    const body = { id: 1, dueDate: '2000-01-01T00:00:00Z' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
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

  it('TC_TODO_UPDATE_0008', async () => {
    const body = { id: 1, dueDate: 'not a date' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
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

  it('TC_TODO_UPDATE_0009', async () => {
    const body = {
      id: 1,
      title: 'Buy Milk Update',
      description: 'Get from store - updated',
      dueDate: '2030-02-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
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

  it('TC_TODO_UPDATE_0010', async () => {
    const body = {
      id: 1,
      title: 'Buy Milk Update',
      description: 'Get from store - updated',
      dueDate: '2030-02-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', 'Bearer invalid.token')
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

  it('TC_TODO_UPDATE_0011', async () => {
    jest.spyOn(todosService, 'update').mockImplementationOnce(async () => {
      throw new NotFoundException(
        'Todo not found or not owned by this account'
      );
    });

    const body = {
      id: 30,
      title: 'Buy Milk Update',
      description: 'Get from store - updated',
      dueDate: '2030-02-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });

  it('TC_TODO_UPDATE_0012', async () => {
    const body: any = { id: 1, title: 'Buy Milk Update', extra: 'abc' };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/property.*extra.*should not exist/i)
        ])
      })
    );
  });

  it('TC_TODO_UPDATE_0013', async () => {
    jest.spyOn(todosService, 'update').mockImplementationOnce(async () => {
      throw new NotFoundException(
        'Todo not found or not owned by this account'
      );
    });

    const body = {
      id: 999999,
      title: 'Buy Milk Update'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });
});
