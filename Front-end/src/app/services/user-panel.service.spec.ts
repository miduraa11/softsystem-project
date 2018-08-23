import { TestBed, inject } from '@angular/core/testing';

import { UserPanelService } from './user-panel.service';

describe('UserPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPanelService]
    });
  });

  it('should be created', inject([UserPanelService], (service: UserPanelService) => {
    expect(service).toBeTruthy();
  }));
});
