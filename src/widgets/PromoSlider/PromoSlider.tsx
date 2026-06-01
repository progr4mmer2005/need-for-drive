import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/shared/components/Button';
import { classNames } from '@/shared/lib/classNames';
import { SLIDER_SLIDES } from '@/shared/model/sliderSlides';
import * as styles from './PromoSlider.module.scss';

type TPromoSliderProps = {
  isDimmed: boolean;
};

const AUTOPLAY_DELAY_MS = 3000;
const AUTOPLAY_RESUME_DELAY_MS = 10000;

export function PromoSlider({ isDimmed }: TPromoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const resumeTimeoutRef = useRef<number | null>(null);

  const totalSlides = SLIDER_SLIDES.length;
  const activeSlide = useMemo(() => SLIDER_SLIDES[activeIndex], [activeIndex]);

  useEffect(() => {
    if (!isAutoPlayEnabled) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isAutoPlayEnabled, totalSlides]);

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    },
    []
  );

  const pauseAutoplayAndScheduleResume = () => {
    setIsAutoPlayEnabled(false);

    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoPlayEnabled(true);
      resumeTimeoutRef.current = null;
    }, AUTOPLAY_RESUME_DELAY_MS);
  };

  const handlePrev = () => {
    pauseAutoplayAndScheduleResume();
    setActiveIndex((currentIndex) => (currentIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    pauseAutoplayAndScheduleResume();
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
  };

  const handleBulletClick = (index: number) => {
    pauseAutoplayAndScheduleResume();
    setActiveIndex(index);
  };

  return (
    <section className={styles.slider}>
      <div className={classNames(styles.menuOverlay, isDimmed && styles.menuOverlayActive)} />

      <div className={styles.viewport}>
        {SLIDER_SLIDES.map((slide, index) => (
          <article
            key={slide.title}
            aria-hidden={index !== activeIndex}
            className={classNames(styles.slide, index === activeIndex && styles.slideActive)}
            style={{
              backgroundImage: `url(${slide.image})`,
              opacity: index === activeIndex ? 1 : 0,
            }}
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
          {SLIDER_SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              aria-label={`Перейти к слайду ${index + 1}`}
              className={classNames(styles.bullet, index === activeIndex && styles.bulletActive)}
              type="button"
              onClick={() => handleBulletClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
