import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/mockup1.jpeg',
    'assets/images/mockup2.jpeg',
    'assets/images/mockup3.jpeg',
    'assets/images/mockup4.jpeg',
    'assets/images/mockup5.jpeg',
    'assets/images/mockup6.jpeg',
    'assets/images/mockup7.jpeg',
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  conversion = 0;
responsive = 0;

private hasAnimated = false;

ngAfterViewInit(): void {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !this.hasAnimated) {
      this.hasAnimated = true;
      this.animateNumbers();
    }
  });

  observer.observe(document.getElementById('hero')!);
}

animateNumbers() {
  this.animateValue('conversion', 120, 1500);
  this.animateValue('responsive', 100, 1500);
}

animateValue(property: 'conversion' | 'responsive', target: number, duration: number) {
  const start = 0;
  const startTime = performance.now();

  const update = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    this[property] = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}
}