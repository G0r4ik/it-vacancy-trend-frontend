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
