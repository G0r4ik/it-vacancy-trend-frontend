function getLocale() {
  return navigator.languages && navigator.languages.length > 0
    ? navigator.languages[0]
    : navigator.language
}

const formatter = new Intl.DateTimeFormat(getLocale(), {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export const formateDate = date => formatter.format(new Date(date))

export function inFieldOfViewY(target) {
  const targetPosition = {
    top: window.scrollY + target.getBoundingClientRect().top,
    bottom: window.scrollY + target.getBoundingClientRect().bottom,
  }

  const windowPosition = {
    top: window.scrollY,
    bottom: window.scrollY + document.documentElement.clientHeight,
  }

  return (
    targetPosition.bottom > windowPosition.top &&
    targetPosition.top < windowPosition.bottom
  )
}

export function throttle(function_, ms) {
  let isThrottled = false
  let savedArguments
  let savedThis

  function wrapper() {
    if (isThrottled) {
      savedArguments = arguments
      savedThis = this
      return
    }

    Reflect.apply(function_, this, arguments)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false
      if (savedArguments) {
        wrapper.apply(savedThis, savedArguments)
        savedArguments = savedThis = null
      }
    }, ms)
  }

  return wrapper
}
