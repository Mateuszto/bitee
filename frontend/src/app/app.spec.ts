import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

import { App } from './app';

describe('App', () => {
   let component: App;
   let fixture: ComponentFixture<App>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [RouterOutlet, TuiRoot, App],
      }).compileComponents();

      fixture = TestBed.createComponent(App);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create the app component', () => {
      expect(component).toBeTruthy();
   });
});
