import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  title$!: Observable<string>;
  breadcrumb$!: Observable<BreadcrumbItem[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title$ = this.route.data.pipe(map((data) => data['title'] || ''));
    this.breadcrumb$ = this.route.data.pipe(
      map((data) => data['breadcrumb'] || [])
    );
  }
}
