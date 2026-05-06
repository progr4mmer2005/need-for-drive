import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/shared/components/Button';
import { classNames } from '@/shared/lib/classNames';
import { sliderSlides } from '@/shared/model/sliderSlides';
import * as styles from './PromoSlider.module.scss';

type TPromoSliderProps = {
  isDimmed: boolean;
};

export function PromoSlider({ isDimmed }: TPromoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = sliderSlides.length;
  const activeSlide = useMemo(() => sliderSlides[activeIndex], [activeIndex]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
    }, 4000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [totalSlides]);

  const handlePrev = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
  };

  return (
    <section className={styles.slider}>
      <div className={classNames(styles.menuOverlay, isDimmed && styles.menuOverlayActive)} />

      <div className={styles.viewport}>
        {sliderSlides.map((slide, index) => (
          <article
            key={slide.title}
            aria-hidden={index !== activeIndex}
            className={classNames(styles.slide, index === activeIndex && styles.slideActive)}
            style={{ backgroundImage: `url(${slide.image})`, opacity: index === activeIndex ? 1 : 0 }}
          >
            <div className={styles.overlay} />
          </article>
        ))}

        <div className={styles.content}>
          <h2 className={styles.title}>{activeSlide.title}</h2>
          <p className={styles.description}>{activeSlide.description}</p>
          <Button size="slider" tone={activeSlide.tone}>
            Подробнее
          </Button>
        </div>

        <button
          aria-label="Предыдущий слайд"
          className={classNames(styles.navButton, styles.navButtonLeft)}
          type="button"
          onClick={handlePrev}
        >
          <span className={styles.arrow} />
        </button>

        <button
          aria-label="Следующий слайд"
          className={classNames(styles.navButton, styles.navButtonRight)}
          type="button"
          onClick={handleNext}
        >
          <span className={classNames(styles.arrow, styles.arrowRight)} />
        </button>

        <div className={styles.pagination}>
          {sliderSlides.map((slide, index) => (
            <button
              key={slide.title}
              aria-label={`Перейти к слайду ${index + 1}`}
              className={classNames(styles.bullet, index === activeIndex && styles.bulletActive)}
              type="button"
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
