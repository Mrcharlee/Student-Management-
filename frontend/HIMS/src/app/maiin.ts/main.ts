import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../app.config';
import { provideRouter } from '@angular/router';;''
import { routes } from './app.routes';
import { LayoutComponent } from '../home/layout';

bootstrapApplication(LayoutComponent, appConfig)
  .catch((err) => console.error(err));
  