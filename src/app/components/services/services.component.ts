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
      image: ''
    },
    {
      title: 'Landing Pages',
      description: 'Páginas estratégicas para campanhas, lançamentos e captação de leads.',
      image: ''
    },
    {
      title: 'Otimização & Performance',
      description: 'Melhoria de velocidade, SEO e experiência do usuário.',
      image: ''
    },
    {
      title: 'Manutenção & Suporte',
      description: 'Atualizações, segurança e acompanhamento contínuo do seu projeto.',
      image: ''
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