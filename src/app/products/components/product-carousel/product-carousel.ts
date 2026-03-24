import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild, ViewEncapsulation } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';



@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
  .swiper {
    width: 100%;
    height: 100%;
    max-height: 450px;
    min-height: 260px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-color: var(--color-accent);
    --swiper-navigation-size: 24px; /* más pequeñas y discretas */
  }

    .swiper-pagination-bullet {
      background: var(--color-accent);
      opacity: 0.4;
    }

    .swiper-pagination-bullet-active {
      background: var(--color-accent) !important;
      opacity: 1;
    }
  `
})
export class ProductCarousel implements AfterViewInit, OnChanges {

  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['images'].firstChange) return;

    if( !this.swiper ) return;

    this.swiper.destroy(true, false);
    setTimeout(() => {
      this.swiperInit();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [
        Navigation, Pagination
      ],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
