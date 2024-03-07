import { Injectable } from '@angular/core';
import { Slider } from '../models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor() {
  }
  getAll(): Slider[] {
    let sliders: Slider[] = [
      { title: { "en": "lovely japanese garden" }, url: "../../assets/sliders/lovely-japanese-garden-wallpaper.jpg" },
      { title: { "en": "luxury resort in maldives" }, url: "../../assets/sliders/luxury-resort-in-maldives-wallpaper.jpg" },
      { title: { "en": "snow mountains landscape" }, url: "../../assets/sliders/snow-mountains-landscape-wallpaper.jpg" },
      { title: { "en": "beautiful lake view" }, url: "../../assets/sliders/beautiful-lake-view-wallpaper.jpg" }];
    return sliders;
  }
}
