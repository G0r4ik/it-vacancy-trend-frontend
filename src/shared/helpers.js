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
