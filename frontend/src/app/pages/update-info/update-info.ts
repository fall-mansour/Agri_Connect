import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-update-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-info.html',
  styleUrl: './update-info.scss',
})
export class UpdateInfo implements OnInit {

  form!: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      statut: ['utilisateur'],
      password: [''],
      password_confirmation: ['']
    });

    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.loading = true;

    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.form.patchValue({
          nom: res.data.nom,
          prenom: res.data.prenom,
          adresse: res.data.adresse,
          telephone: res.data.telephone,
          email: res.data.email,
          statut: res.data.statut
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Impossible de charger vos informations';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.form.invalid) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.loading = true;

    this.profileService.updateProfile(this.form.value).subscribe({
      next: (res) => {
        this.successMsg = res.message || 'Informations enregistrées avec succès !';
        this.loading = false;

        this.form.patchValue({
          password: '',
          password_confirmation: ''
        });
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erreur lors de la mise à jour';
        this.loading = false;
      }
    });
  }
}