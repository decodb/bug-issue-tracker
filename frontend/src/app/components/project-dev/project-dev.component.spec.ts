import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDevComponent } from './project-dev.component';

describe('ProjectDevComponent', () => {
  let component: ProjectDevComponent;
  let fixture: ComponentFixture<ProjectDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
