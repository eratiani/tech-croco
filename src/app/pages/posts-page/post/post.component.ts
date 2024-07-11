import { Component, Input, OnInit } from '@angular/core';
import { IPostWithUrl } from '../../../shared/interfaces/posts';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() posts!: IPostWithUrl[];
}
