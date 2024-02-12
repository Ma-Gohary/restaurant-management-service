import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Integration Test', () => {
  let app: INestApplication;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });
  
  it('should return a specific response with the given id', async () => {
    const id = '123'; // Replace with the desired id
    const expectedResponse = { id: '123', fullName: 'John Doe' }; // Replace with the expected response
    
    const response = await request(app.getHttpServer())
      .get(`/api/user/${id}`)
      .expect(200);
    
    expect(response.body).toEqual(expectedResponse);
  });
});