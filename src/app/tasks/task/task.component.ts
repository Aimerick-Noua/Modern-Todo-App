import { Component, computed, Input, output, signal } from '@angular/core';
import { Task } from '../task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  // task = input.required<Task>();
  toggleDetails = signal(false);
  isCompleted = output()
  deleteTask = output()
  editTask = output();
  @Input({required:true}) task!:Task;
  
  onToggleTaskDetails() {
    this.toggleDetails.update((curr) => !curr);
  }
  markedCompleted(){
      this.isCompleted.emit()
  }

  onDelete(){
      this.deleteTask.emit()
  }
  onEdit(){
    this.editTask.emit();
  }
}
