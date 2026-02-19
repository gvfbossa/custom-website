import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  enviado = false;
  enviando = false;

  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {

    if (form.invalid || this.enviando) return;

    this.enviando = true

    const formData = new FormData();
    formData.append('nome', form.value.nome);
    formData.append('email', form.value.email);
    formData.append('mensagem', form.value.mensagem);
    formData.append('_subject', 'Novo Lead - TopSite');
    formData.append('_captcha', 'false');
    formData.append('_replyto', form.value.email);

    this.http.post(
      'https://formsubmit.co/ajax/contato@bossawebsolutions.com.br',
      formData
    ).subscribe({
      next: () => {
        this.enviado = true;
              this.enviando = false;
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.enviando = false;
      }
    });
  }

}