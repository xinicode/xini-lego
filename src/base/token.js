export const setToken = (token) => {
  localStorage.setItem('Token', token)
}

export const getToken = (token) => {
  return localStorage.getItem('Token')
}

export const removeToken = () => {
  localStorage.removeItem('Token')
}