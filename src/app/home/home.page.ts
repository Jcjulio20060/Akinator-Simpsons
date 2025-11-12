import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { SimpsonsApi, Simpson } from '../services/simpsons-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, HeaderComponent, CommonModule, IonSpinner],
})
export class HomePage implements OnInit {
  characters: Simpson[] = [];
  loading = true;
  error: string | null = null;

  constructor(private simpsonsApi: SimpsonsApi) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.simpsonsApi.getCharacters().subscribe({
      next: (data) => {
        console.log('Personagens carregados:', data);
        this.characters = data.slice(0, 12); // Pega os primeiros 12 personagens
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar personagens:', err);
        this.error = 'Erro ao carregar os personagens';
        this.loading = false;
      }
    });
  }
}