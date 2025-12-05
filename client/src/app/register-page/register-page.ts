import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSubmit() {
    this.form.disable();
    this.aSub = this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      (err) => {
        MaterialService.toast(err.error.message)
        this.form.enable();
      }
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Теперь вы можете зайти в систему используя свои данные
      }
      else if (params['accessDenied']) {
        //Для начала авторизуйтесь в системе
      }
    });
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
  }
}
