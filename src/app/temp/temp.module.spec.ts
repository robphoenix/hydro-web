import { TempModule } from './temp.module';

describe('TempModule', () => {
  let tempModule: TempModule;

  beforeEach(() => {
    tempModule = new TempModule();
  });

  it('should create an instance', () => {
    expect(tempModule).toBeTruthy();
  });
});
