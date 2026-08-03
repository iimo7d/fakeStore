import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../core/components/footer';
import { Header } from '../core/components/header';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header />
    <main class="flex-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  imports: [RouterOutlet, Footer, Header],
  host: {
    class: 'flex min-h-screen flex-col bg-slate-50',
  },
})
export class MainLayout {}
