import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { MonitorsService } from './monitors.service';

describe('MonitorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MonitorsService]
    });
  });

  it('should be created', inject(
    [MonitorsService],
    (service: MonitorsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
