import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  services = [
    {
      title: 'Site Profissional',
      description: 'Sites modernos, rápidos e pensados para converter visitantes em clientes reais.',
      image: 'assets/images/services1.jpeg'
    },
    {
      title: 'Landing Pages',
      description: 'Páginas estratégicas para campanhas, lançamentos e captação de leads.',
      image: 'assets/images/services2.jpeg'
    },
    {
      title: 'Otimização & Performance',
      description: 'Melhoria de velocidade, SEO e experiência do usuário.',
      image: 'assets/images/services3.jpeg'
    },
    {
      title: 'Manutenção & Suporte',
      description: 'Planos para atualizações e suporte para acompanhamento contínuo do seu projeto.',
      image: 'assets/images/services4.jpeg'
    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseAutoplay(): void {
    clearInterval(this.intervalId);
  }

  nextSlide(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.services.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}