import { HydroMaterialModule } from './material.module';

describe('HydroMaterialModule', () => {
  let hydroMaterialModule: HydroMaterialModule;

  beforeEach(() => {
    hydroMaterialModule = new HydroMaterialModule();
  });

  it('should create an instance', () => {
    expect(hydroMaterialModule).toBeTruthy();
  });
});
