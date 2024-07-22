import Swiper from 'swiper'

class Qwiz {
  $qwiz: HTMLElement
  qwizSlider: Swiper

  constructor($qwiz: HTMLElement, qwizSlider: Swiper) {
    this.$qwiz = $qwiz
    this.qwizSlider = qwizSlider
  }

  init() {
    this.initListeners()
    this.checkForm()
  }

  initListeners() {
    this.$qwiz.addEventListener('input', this.checkForm.bind(this))
    this.qwizSlider.on('slideChange', this.checkForm.bind(this))
  }

  checkForm() {
    const activeForm = this.qwizSlider.slides[this.qwizSlider.activeIndex]

    const inputs = [
      ...Array.from(activeForm.querySelectorAll('input')),
      ...Array.from(activeForm.querySelectorAll('textarea')),
      ...Array.from(activeForm.querySelectorAll('select')),
    ]

    let isReady = false

    for (const i in inputs) {
      if (!Object.hasOwnProperty.call(inputs, i)) continue

      if (inputs[i].type == 'checkbox' || inputs[i].type == 'radio') {
        // @ts-ignore
        if (inputs[i].checked) {
          isReady = true
        }

        continue
      }

      if (inputs[i].value != '') {
        isReady = true
      }

      if (inputs[i].value == '' && inputs[i].required) {
        isReady = false
        break
      }
    }

    if (!isReady) {
      this.$qwiz.classList.add('stopped')
    } else {
      this.$qwiz.classList.remove('stopped')
    }
  }
}

export default Qwiz
