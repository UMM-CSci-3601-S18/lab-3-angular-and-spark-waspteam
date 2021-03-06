import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;

  selected = 'option2';

  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }


  public filterTodos(searchOwner: string, searchBody: string, searchCategory: string, searchStatus: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      let searchStatusBoolean: boolean;
      if('true'.includes(searchStatus)){
        searchStatusBoolean = true;
      }else if('false'.includes(searchStatus)){
        searchStatusBoolean = false;
      }else {
        searchStatusBoolean = null;
      }
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatusBoolean || (todo.status === (searchStatusBoolean));
      });
    }


    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) =>{
        return !searchBody || (todo.body.includes(searchBody));
      });
    }

    //Filter by category
    if (searchCategory != null) {
      searchCategory = searchCategory.toLocaleLowerCase();
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) =>{
        return !searchCategory || (todo.category.includes(searchCategory));
      })
    }

    return this.filteredTodos;
  }


  /**
   * Starts an asynchronous operation to update the todos list
   *
   */

  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoOwner,
          this.todoBody, this.todoCategory,
          this.todoStatus);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
