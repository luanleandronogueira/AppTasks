import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  constructor() { }

  public getTasks() : Task[] {
  
    return this.tasks;
}

  public addTask(value: string, date: string){

    date = date.replace('-', '/');
    let task : Task = { value: value, date: new Date(date), done: false }
    this.tasks.push(task);
    console.log(this.tasks)

  }

  public delTask(){}

  public updateTask(){}

}

interface Task {

  value: string;
  date: Date;
  done?: boolean;

}

