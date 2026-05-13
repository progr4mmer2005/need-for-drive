const slide1 = new URL('../../assets/images/slider/1.webp', import.meta.url).toString();
const slide2 = new URL('../../assets/images/slider/2.webp', import.meta.url).toString();
const slide3 = new URL('../../assets/images/slider/3.webp', import.meta.url).toString();
const slide4 = new URL('../../assets/images/slider/4.webp', import.meta.url).toString();

type TSlideTone = 'darkGreen' | 'cyan' | 'darkRed' | 'purple';

export type TSliderSlide = {
  description: string;
  image: string;
  title: string;
  tone: TSlideTone;
};

export const sliderSlides: TSliderSlide[] = [
  {
    title: 'Бесплатная парковка',
    description:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    image: slide1,
    tone: 'darkGreen',
  },
  {
    title: 'Страховка',
    description: 'Полная страховка автомобиля.',
    image: slide2,
    tone: 'cyan',
  },
  {
    title: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт',
    image: slide3,
    tone: 'darkRed',
  },
  {
    title: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО',
    image: slide4,
    tone: 'purple',
  },
];
