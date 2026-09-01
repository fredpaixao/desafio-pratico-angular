import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.scss',
  templateUrl: './sidebar.component.html',
})
export class Sidebar {
  menuItems = [{ label: 'Contábil', icon: 'menu_book', route: '/contabil/outros-creditos-debitos' }];
}
