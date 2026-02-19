import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  chatOpen = false;
  step = 1;
  business = '';
  isTyping = false;

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    this.step = 1;
    this.business = '';
    this.isTyping = false;
  }

  nextStep() {
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;
      this.step = 2;
    }, 1800);
  }

  goToWhatsApp() {
    if (!this.business.trim()) return;

    const phone = '5511953468808';

    const message =
      `Olá! Tenho um(a) ${this.business} e quero um site profissional para atrair mais clientes. Pode me explicar como funciona?`;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
      '_blank'
    );

    this.chatOpen = false;
    this.business = '';
  }
}
