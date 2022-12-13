import { TestBed } from '@angular/core/testing';

import { AnomaliasService } from './anomalias.service';

describe('AnomaliasService', () => {
  let service: AnomaliasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnomaliasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
