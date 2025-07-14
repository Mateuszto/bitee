import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, TuiRoot, App]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });
});
