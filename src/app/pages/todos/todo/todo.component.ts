import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITodo } from '../../../shared/interfaces/todos';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() todos!: ITodo[];
}
