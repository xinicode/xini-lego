console.log("a")



let routes = {
  '/': 'hhhh',
  '/test':'testt',
  '/test2':'test2'
}


const handleChange = (key) => {
  console.log(key)

  window.history.pushState(
    null,
    routes[key],key
  )
  document.getElementById('app').innerHTML = `${routes[key]  }`




}


document.addEventListener('click',(e)=>{
  if(e.target.classList.contains("nav")){
    e.preventDefault()
    handleChange(e.target.dataset.route)
  }
})
