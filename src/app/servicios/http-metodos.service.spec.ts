import { TestBed } from '@angular/core/testing';

import { HttpMetodosService } from './http-metodos.service';

describe('HttpMetodosService', () => {
  let service: HttpMetodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMetodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
