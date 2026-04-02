import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
import { ChatComponent } from "./components/chat/chat.component";
import { filter } from 'rxjs/operators';

declare global { interface Window { dataLayer: any[]; gtag: (...args: any[]) => void; } }

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
    FooterComponent,
    ChatComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'custom-website';

  constructor(private router: Router) {
    // Cria o script do GA dinamicamente
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZQL2PGEJM4';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Inicializa o GA
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());

    // Configuração principal do GA
    window.gtag('config', 'G-ZQL2PGEJM4', {
      cookie_flags: 'SameSite=None;Secure',
      cookie_domain: 'sitefacilja.bossawebsolutions.com.br'
    });

    // SPA page view tracking
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      window.gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects,
        page_title: document.title,
        page_location: window.location.href
      });
    });
  }

  ngOnInit() {
    // Nenhuma configuração de PWA
  }
}