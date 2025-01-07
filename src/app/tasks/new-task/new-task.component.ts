import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit{

  showform = output();
  dataToEdit=input.required<Task>({alias:'data'});
  
  title=''
  description=''
  dueDate=''
  id!:string;
  isCompleted!:boolean
constructor(){
  
}
  ngOnInit(){
    if(this.dataToEdit()){
      this.title=this.dataToEdit().title;
      this.description=this.dataToEdit().description;
      this.dueDate=this.dataToEdit().dueDate;
      this.id=this.dataToEdit().id;
      this.isCompleted = this.dataToEdit().isCompleted;
      
    }
    console.log(this.dataToEdit());

  }

  add = output<{title:string,description:string,dueDate:string}>();
  update = output<Task>();
  onSubmit(){
    if(this.dataToEdit()){
      this.update.emit({
        title: this.title,
        description:this.description,
        dueDate:this.dueDate,
        id:this.id,
        isCompleted:this.isCompleted
      })
    }else{
      this.add.emit({
        title: this.title,
        description:this.description,
        dueDate:this.dueDate
      })
    }
   
    
  }
  onCancel(){
    this.showform.emit()
  }
}
