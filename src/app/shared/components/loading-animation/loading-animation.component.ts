import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  standalone: true,
  imports: [],
  templateUrl: './loading-animation.component.html',
  styleUrl: './loading-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingAnimationComponent {}
