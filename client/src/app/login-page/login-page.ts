import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSubmit() {
    // this.form.disable();
    this.aSub = this.authService.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      (err) => {
        MaterialService.toast(err.error.message)
        // this.form.enable();
      }

    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('user@mail.com', [Validators.email, Validators.required]),
      password: new FormControl('123', [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные')
      }
      else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе')
      }
      else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново')
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
