import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTask= output<string>();

  onSearchTask(text:string){
    this.searchTask.emit(text)
  }
}
