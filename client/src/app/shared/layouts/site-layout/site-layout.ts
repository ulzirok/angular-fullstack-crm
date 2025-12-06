import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  standalone: false,
  templateUrl: './site-layout.html',
  styleUrl: './site-layout.scss',
})
export class SiteLayout implements AfterViewInit {
  private auth = inject(AuthService)
  private router = inject(Router)
  @ViewChild('floating') floatingRef!: ElementRef
  
  links = [
    { url: '/overview', name: 'Обзор'},
    { url: '/analytics', name: 'Аналитика'},
    { url: '/history', name: 'История'},
    { url: '/order', name: 'Добавить заказ'},
    { url: '/categories', name: 'Ассортимент'},
  ]
  
  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  
  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }
}
