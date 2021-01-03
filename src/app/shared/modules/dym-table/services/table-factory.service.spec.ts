import { TestBed } from '@angular/core/testing';

import { TableFactoryService } from './table-factory.service';

describe('TableFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableFactoryService = TestBed.get(TableFactoryService);
    expect(service).toBeTruthy();
  });
});
