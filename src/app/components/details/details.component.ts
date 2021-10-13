import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Biblio } from '../../models/biblio.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  todo: Biblio = {
    anyopub: null,
    autores: null,
    doi: null,
    eventorevista: null,
    tipopub: null,
    titulopub: null,
  };

  todoId= null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private todoService: TodoService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(todo => {
      loading.dismiss();;
      this.todo = todo;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }
  async onRemoveTodo(idTodo: string) {
    this.todoService.removeTodo(idTodo);
  }

}
