import { BuildingsModule } from './buildings.module';

describe('BuildingsModule', () => {
  let buildingsModule: BuildingsModule;

  beforeEach(() => {
    buildingsModule = new BuildingsModule();
  });

  it('should create an instance', () => {
    expect(buildingsModule).toBeTruthy();
  });
});
