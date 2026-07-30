import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../core/components/footer";
import { header } from "../core/components/header";

@Component({
  selector:"app-main-layout",
  template:`

  <app-header/>
  <router-outlet/>
  <app-footer/>

  `,
  imports: [RouterOutlet, Footer, header]
})

export class MainLayout{

}
