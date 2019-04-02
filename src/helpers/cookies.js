export const isCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  return parts.length !== 2
    ? undefined
    : parts.pop().split(';').shift()
}

export const setCookie = (name, value, expiration) => {
  document.cookie = `${name}=${value}; expires=${expiration}`
}
