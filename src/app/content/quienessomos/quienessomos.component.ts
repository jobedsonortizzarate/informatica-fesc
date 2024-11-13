import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quienessomos',
  standalone: false,
  templateUrl: './quienessomos.component.html',
  styleUrl: './quienessomos.component.scss',
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
  
})
export class QuienessomosComponent {

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 2000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

}


