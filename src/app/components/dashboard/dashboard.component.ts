import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Biblio } from '../../models/biblio.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos: Biblio[];

  constructor(
    private todoService: TodoService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    if (this.todoService.getTodos()) {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result;
    });
    }
  }
}
