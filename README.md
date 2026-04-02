# SiteFácilJá — Deploy e SEO Guide

Este README descreve como configurar, deployar e otimizar SEO do projeto Angular **SiteFácilJá**, incluindo domínio próprio, Firebase Hosting, Google Analytics, `robots.txt` e `sitemap.xml`.

---

## 1. Pré-requisitos

* Node.js >= 18
* Angular CLI >= 16
* Firebase CLI (`npm install -g firebase-tools`)
* Conta no Firebase
* Domínio registrado no Registro.br

---

## 2. Estrutura do Projeto

* `custom-website/` — código Angular
* `src/sitemap.xml` — sitemap para SEO
* `src/robots.txt` — regras de indexação
* `firebase.json` — configuração do Firebase Hosting
* `angular.json` — configurar output `dist/custom-website`

---

## 3. Configuração do Angular

No `angular.json`:

```json
"projects": {
  "custom-website": {
    ...
    "architect": {
      "build": {
        "options": {
          "outputPath": "dist/custom-website",
          ...
        }
      }
    }
  }
}
```

* `outputPath` precisa bater com `firebase.json`.

---

## 4. Configuração do Firebase

### 4.1 Inicializar Firebase Hosting

```bash
firebase login
firebase init
```

Durante o `firebase init`:

* **Choose Hosting** → sim
* **Select project** → `sitefacilja`
* **Public directory** → `dist/custom-website`
* **Single-page app?** → `Yes`

### 4.2 Configuração do `firebase.json`

```json
{
  "hosting": {
    "public": "dist/custom-website",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

---

## 5. SEO: robots.txt e sitemap.xml

### 5.1 `robots.txt` (em `src/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://sitefacilja.bossawebsolutions.com.br/sitemap.xml
```

### 5.2 `sitemap.xml` (em `src/sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sitefacilja.bossawebsolutions.com.br/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sitefacilja.bossawebsolutions.com.br/contact</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

> Durante o build, copie os arquivos para `dist/custom-website` antes do deploy:

```json
"deploy": "rm -rf dist/ && ng build --configuration production && cp src/sitemap.xml dist/custom-website/ && cp src/robots.txt dist/custom-website/ && firebase deploy"
```

---

## 6. SEO & Google Analytics no Angular

### 6.1 `index.html` (exemplo minimal SEO / OG)

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>SiteFácilJá – Sites profissionais que aumentam suas vendas</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="description" content="Sites, lojas virtuais e sistemas personalizados com design moderno, domínio próprio e hospedagem rápida.">
  <meta name="keywords" content="site profissional, portfólio online, loja virtual, serviços web">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Bossa Web Solutions">

  <!-- Open Graph -->
  <meta property="og:title" content="Site Fácil — Crie seu site profissional hoje">
  <meta property="og:description" content="Sites, lojas virtuais e sistemas personalizados com design moderno, domínio próprio e hospedagem rápida.">
  <meta property="og:image" content="https://sitefacilja.bossawebsolutions.com.br/assets/images/og-image.png">
  <meta property="og:url" content="https://sitefacilja.bossawebsolutions.com.br">
  <meta property="og:type" content="website">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Site Fácil Já — Crie seu site profissional hoje">
  <meta name="twitter:description" content="Sites, lojas virtuais e sistemas personalizados com design moderno, domínio próprio e hospedagem rápida.">
  <meta name="twitter:image" content="https://sitefacilja.bossawebsolutions.com.br/assets/images/og-image.png">

  <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### 6.2 `app.component.ts` (Google Analytics SPA)

```ts
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
    HeaderComponent, HeroComponent, AboutComponent, ServicesComponent,
    ProductComponent, PortfolioComponent, TestimonialsComponent,
    ContactComponent, FooterComponent, ChatComponent, CtaComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'custom-website';

  constructor(private router: Router) {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZQL2PGEJM4';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());

    window.gtag('config', 'G-ZQL2PGEJM4', {
      cookie_flags: 'SameSite=None;Secure',
      cookie_domain: 'sitefacilja.bossawebsolutions.com.br'
    });

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

  ngOnInit() {}
}
```

---

## 7. Deploy

1. Build e copiar sitemap/robots:

```bash
npm run deploy
```

2. Firebase vai atualizar o hosting em `https://sitefacilja.bossawebsolutions.com.br`.

---

## 8. Domínio Próprio

1. No Firebase Hosting, vá em **Adicionar domínio personalizado** → `sitefacilja.bossawebsolutions.com.br`
2. Adicione os registros TXT no Registro.br conforme instruções do Firebase
3. Aguarde propagação do DNS (até 24h)
4. Verifique no Firebase.

---

## 9. Notas finais

* Favicon deve estar em `assets/images/favicon.ico`
* Para SEO, sempre atualizar `sitemap.xml` quando criar novas rotas
* Para múltiplos ambientes (dev/prod), ajustar `angular.json` e `firebase.json`
