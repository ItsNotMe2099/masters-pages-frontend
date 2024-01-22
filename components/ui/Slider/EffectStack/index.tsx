export default function Effectstack({ swiper, on }: any) {
  on('beforeInit', () => {
    if (swiper.params.effect !== 'stack') return
    swiper.classNames.push(`${swiper.params.containerModifierClass}stack`)
    const overwriteParams = {
      watchSlidesProgress: true,
      centeredSlides: true,
    }

    Object.assign(swiper.params, overwriteParams)
    Object.assign(swiper.originalParams, overwriteParams)
  })
  on('progress', () => {
    if (swiper.params.effect !== 'stack') return
    const scaleStep = 0.4
    const zIndexMax = swiper.slides.length
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i]
      const slideProgress = swiper.slides[i].progress
      console.log('slideProgress0', swiper.slides[0].progress)
      console.log('slideProgress1', swiper.slides[1].progress)
      console.log('slideProgress2', swiper.slides[2].progress)
      const absProgress = Math.abs(slideProgress)
      console.log('absProgress', absProgress)
      let modify = 1
      if (absProgress > 0) {
        modify = (absProgress - 1) * 0.3 + 1
        console.log('modify', modify)
      }
      const opacityEls = slideEl.querySelectorAll(
        '.swiper-stack-animate-opacity',
      )
      const translateX = `${slideProgress * 100}%`
      //const translateY = `${slideProgress * 60}px`
      //const scale = 1 - absProgress * scaleStep
      //const zIndex = zIndexMax - Math.abs(Math.round(slideProgress))
      let scale
      let translateY
      let zIndex
      if (slideProgress === 0) {
        scale = 1;
        translateY = '0px'
        zIndex = 3
      } else if (translateX === '-100%' || translateX === '200%') {
        scale = 0.8
        translateY = '10%'
        zIndex = 2
      } else {
        scale = 0.7
        translateY = '20%'
        zIndex = 1
      }
      slideEl.style.transform = `translate(${translateX}, ${translateY}) scale(${scale})`
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
    if (swiper.params.effect !== 'stack') return
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i]
      const opacityEls = slideEl.querySelectorAll(
        '.swiper-stack-animate-opacity',
      )
      slideEl.style.transitionDuration = `${duration}ms`
      opacityEls.forEach((opacityEl: any) => {
        opacityEl.style.transitionDuration = `${duration}ms`
      })
    }
  })
}
