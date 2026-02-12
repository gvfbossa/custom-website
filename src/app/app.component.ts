import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { ServicesComponent } from "./components/services/services.component";
import { ProductComponent } from "./components/product/product.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { TestimonialsComponent } from "./components/testimonials/testimonials.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CtaComponent } from "./components/cta/cta.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    HeroComponent, 
    AboutComponent, 
    ServicesComponent, 
    ProductComponent, 
    PortfolioComponent, 
    TestimonialsComponent, 
    ContactComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-website';
}
