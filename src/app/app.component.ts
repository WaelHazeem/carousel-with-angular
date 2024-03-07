import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SliderService } from './services/slider.service';
import { Slider } from './models/slider.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Carousel-Angular';
  sliders?: Slider[];
  sliderT: string = '';
  isDataAvailable: boolean = false;
  firstSlide: boolean = true;

  slideIndex: number = 1;
  constructor(private sliderService: SliderService,
    private ref: ChangeDetectorRef, @Inject(PLATFORM_ID) platformId: string,
    private router: Router,
  ) {
  }
  timeinterval: any;
  inWeb: boolean = true;
  ngOnInit(): void {
    this.retrieveSliders();
  }
  ngOnDestroy(): void {
    if (this.timeinterval != null) {
      clearInterval(this.timeinterval);
    }
  }
  retrieveSliders(): void {
    try {
      this.sliders = this.sliderService.getAll();
      this.sliders.forEach(element => { element.url = "./assets" + element.url });
      this.isDataAvailable = true
      this.ref.detectChanges();
      this.showSlides(this.slideIndex);
      this.timeinterval = setInterval(() => this.plusSlides(1), 5000);
    }
    catch
    {
    }
  }
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(selectedSlide: number) {
    let i;
    let slides = document.getElementsByClassName("slider-div");
    if (selectedSlide > slides.length) { this.slideIndex = 1 }
    if (selectedSlide < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      if (this.slideIndex - 1 != i) {

        (slides[i] as HTMLElement).classList.add("slideaway-enabled");
        (slides[i] as HTMLElement).classList.remove("slidein1");
        (slides[i] as HTMLElement).classList.remove("zoom-in");
      }
    }

    this.sliderT = '' + this.sliders![this.slideIndex - 1].title!.en;
    (slides[this.slideIndex - 1] as HTMLElement).classList.remove("slideaway-enabled");
    if (this.firstSlide == true) {
      (slides[this.slideIndex - 1] as HTMLElement).classList.add("zoom-in");
      this.firstSlide = false;
    }
    else
      (slides[this.slideIndex - 1] as HTMLElement).classList.add("slidein1");
  }

}
