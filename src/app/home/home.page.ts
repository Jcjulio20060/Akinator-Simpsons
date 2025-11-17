import { Component, OnInit } from '@angular/core';
import { IonContent, IonSpinner, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone'; 
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SimpsonsApiService, Simpson } from '../services/simpsons-api'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderComponent, CommonModule, IonSpinner, IonFooter, IonToolbar, IonTitle],
})

export class HomePage implements OnInit {
  characters: Simpson[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private simpsonsApi: SimpsonsApiService,
    private router: Router
  ) {} 

  ngOnInit() {
    this.loadCharacters();
  }

  goToDetails(id: string | number | undefined) {
    if (id) {
      this.router.navigate(['/detalhes', id]);
    }
  }

  loadCharacters() {
    this.simpsonsApi.getCharacters().subscribe({
      next: (data) => {
        console.log('Personagens carregados:', data);
        this.characters = data.slice(0, 20);
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