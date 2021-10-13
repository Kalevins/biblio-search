import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Biblio } from '../models/biblio.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private userID: any;
  private todosCollection: AngularFirestoreCollection<Biblio>;
  private todos: Observable<Biblio[]>;

  constructor(db: AngularFirestore, auth: AuthService) {
    auth.afAuth.onAuthStateChanged(user => {
      if(user) {
        this.userID = user.uid;
        return this.userID;
      } else {
        console.log('NO EXIXTE USUARIO');
      }
    });
    if(this.userID) {
      this.todosCollection = db.collection<Biblio>('users/'+this.userID+'/idreferencia');
    } else {
      this.todosCollection = db.collection<Biblio>('users/s5DEbKMG7NPITDEQ5MALoYeghMu1/idreferencia');
    }
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todosCollection.doc<Biblio>(id).valueChanges();
  }

  updateTodo(todo: Biblio, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: Biblio) {
    return this.todosCollection.add(todo);
  }

  removeTodo(id: string) {
    return this.todosCollection.doc(id).delete();
  }
}
