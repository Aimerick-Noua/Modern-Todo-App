import { Component, computed, EventEmitter, input, Input, OnInit, Output, signal } from '@angular/core';
import { Task } from './task.model';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { SearchComponent } from "../search/search.component";
import { HeaderComponent } from "../header/header.component";
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent,SweetAlert2Module, NewTaskComponent, SearchComponent, HeaderComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  
  tasks = signal<Task[]>([]);
  filterdTask = signal<Task[]>([]);

  // @Input() task! :Task[];
  @Output() isCompleted = new EventEmitter<string>()
  completedTask = computed(()=> this.tasks().filter((task)=>task.isCompleted!==false).length);
  ngOnInit(): void {
    
  }

  showForm = signal(false)
  dataToEdit=signal<Task>(this.tasks()[0]);
  onToggleForm() {
    this.showForm.update((showform) => !showform)
  }
  onEditTask(id:string){
    this.onToggleForm();
    const tsk = this.tasks()?.find((task)=>task.id===id);
    if(tsk){
      this.dataToEdit.set(tsk);
    }

  }
  onCloseForm() {
    this.onToggleForm();
  }

  markCompleted(id: string) {
    
     this.tasks.set(this.tasks().map((taskItem) => {
      if(taskItem.id === id){        
        return {...taskItem, isCompleted:!taskItem.isCompleted}
      }
      console.log('er'+taskItem)
      return taskItem;
    }
    
  ))
  
  this.onsave()
  
  }
  dataToUpdate(data: { title: string, description: string, dueDate: string,id:string,isCompleted:boolean }){
    const todo = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
     
    }
    this.tasks.set(this.tasks().map((task)=>{
        if(task.id === data.id){
          return {...task,title:data.title,description:data.description,dueDate:data.dueDate}
        }
        console.log({...task,title:data.title,description:data.description,dueDate:data.dueDate});
        return task;
    }))
    this.onsave();    
    this.onToggleForm();
    Swal.fire({
      title: 'Operation Successful',
      icon: 'success',
      text: `The task ${todo.title} was updated successfully !`,
      timer: 3000, // Time in milliseconds (2 seconds in this example)
      timerProgressBar: true, // Show timer progress bar
    });  
  }
  onAdd(data: { title: string, description: string, dueDate: string }) {

    const todo: Task = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      isCompleted: false,
      id: Math.random().toString()
    }
    console.log(todo);

    this.tasks().unshift(todo);
    this.onToggleForm();
    this.onsave();
    Swal.fire({
      title: 'Operation Successful',
      icon: 'success',
      text: `The task ${todo.title} was added successfully !`,
      timer: 3000, // Time in milliseconds (2 seconds in this example)
      timerProgressBar: true, // Show timer progress bar
    });   
  }

  onTaskDelete(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasks.set(this.tasks().filter((task)=>task.id !== id))
        this.onsave()
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
    
  }
  onSearch(task:string){
    this.filterdTask.set(this.tasks().filter((tsk)=>tsk.title.toLowerCase().includes(task.toLowerCase())));
  }

  constructor(){
    const task = localStorage.getItem('tasks');
    if(task){
      this.tasks.set(JSON.parse(task))
      this.filterdTask.set(JSON.parse(task))
    }
  }
  private onsave(){
    this.filterdTask.set(this.tasks())
    localStorage.setItem('tasks',JSON.stringify(this.tasks()))
  }
}

