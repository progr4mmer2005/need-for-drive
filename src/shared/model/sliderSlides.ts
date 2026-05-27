const SLIDE_1 = new URL('../../assets/images/slider/1.webp', import.meta.url).toString();
const SLIDE_2 = new URL('../../assets/images/slider/2.webp', import.meta.url).toString();
const SLIDE_3 = new URL('../../assets/images/slider/3.webp', import.meta.url).toString();
const SLIDE_4 = new URL('../../assets/images/slider/4.webp', import.meta.url).toString();

type TSlideTone = 'darkGreen' | 'cyan' | 'darkRed' | 'purple';

export type TSliderSlide = {
  description: string;
  image: string;
  title: string;
  tone: TSlideTone;
};

export const SLIDER_SLIDES: TSliderSlide[] = [
  {
    title: 'Бесплатная парковка',
    description:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    image: SLIDE_1,
    tone: 'darkGreen',
  },
  {
    title: 'Страховка',
    description: 'Полная страховка автомобиля.',
    image: SLIDE_2,
    tone: 'cyan',
  },
  {
    title: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт',
    image: SLIDE_3,
    tone: 'darkRed',
  },
  {
    title: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО',
    image: SLIDE_4,
    tone: 'purple',
  },
];
