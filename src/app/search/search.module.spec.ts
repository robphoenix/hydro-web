import { SearchModule } from './search.module';

describe('SearchModule', () => {
  let reportsModule: SearchModule;

  beforeEach(() => {
    reportsModule = new SearchModule();
  });

  it('should create an instance', () => {
    expect(reportsModule).toBeTruthy();
  });
});
