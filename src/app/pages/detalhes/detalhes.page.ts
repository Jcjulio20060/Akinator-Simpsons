import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { SimpsonsApiService, Simpson } from '../../services/simpsons-api';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detalhes',
  templateUrl: 'detalhes.page.html',
  styleUrls: ['detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, HeaderComponent, CommonModule, IonSpinner]
})
export class DetalhesPage implements OnInit, OnDestroy {
  character: Simpson | null = null;
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private simpsonsApi: SimpsonsApiService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadCharacterDetails(id);
      } else {
        this.error = 'ID do personagem não fornecido';
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCharacterDetails(id: number) {
    this.loading = true;
    this.error = null;
    this.simpsonsApi.getCharacterById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.character = Array.isArray(data) ? data[0] : data;
        if (!this.character) {
          this.error = 'Personagem não encontrado';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
        this.error = 'Erro ao carregar os detalhes do personagem. Tente novamente.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getImage(character: Simpson | null | undefined): string {
    if (!character) {
      return 'assets/images/placeholder.png';
    }
    const p = character.portrait_path;
    if (p) {
      const path = p.startsWith('/') ? p : '/' + p;
      return `https://cdn.thesimpsonsapi.com/500${path}`;
    }
    return character.portrait_path || 'assets/images/placeholder.png';
  }
}
