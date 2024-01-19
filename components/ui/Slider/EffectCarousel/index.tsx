export default function EffectCarousel({ swiper, on }: any) {
  on('beforeInit', () => {
    if (swiper.params.effect !== 'carousel') return
    swiper.classNames.push(`${swiper.params.containerModifierClass}carousel`)
    const overwriteParams = {
      watchSlidesProgress: true,
      centeredSlides: true,
    }

    Object.assign(swiper.params, overwriteParams)
    Object.assign(swiper.originalParams, overwriteParams)
  })
  on('progress', () => {
    if (swiper.params.effect !== 'carousel') return
    const scaleStep = 0.4
    const zIndexMax = swiper.slides.length
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i]
      const slideProgress = swiper.slides[i].progress
      const absProgress = Math.abs(slideProgress)
      let modify = 1
      if (absProgress > 0) {
        modify = (absProgress - 1) * 0.3 + 1
      }
      const opacityEls = slideEl.querySelectorAll(
        '.swiper-carousel-animate-opacity',
      )
      const translate = `${slideProgress * modify * 50}%`
      const scale = 1 - absProgress * scaleStep
      const zIndex = zIndexMax - Math.abs(Math.round(slideProgress))
      slideEl.style.transform = `translateX(${translate}) scale(${scale})`
      slideEl.style.zIndex = zIndex
      if (absProgress > 2) {
        slideEl.style.opacity = 0
      } else {
        slideEl.style.opacity = 1
      }

      opacityEls.forEach((opacityEl: any) => {
        opacityEl.style.opacity = 1 - absProgress / 3
      })
    }
  })

  on('setTransition', (s: any, duration: number) => {
    if (swiper.params.effect !== 'carousel') return
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i]
      const opacityEls = slideEl.querySelectorAll(
        '.swiper-carousel-animate-opacity',
      )
      slideEl.style.transitionDuration = `${duration}ms`
      opacityEls.forEach((opacityEl: any) => {
        opacityEl.style.transitionDuration = `${duration}ms`
      })
    }
  })
}
