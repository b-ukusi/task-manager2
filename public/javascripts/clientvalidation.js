const first_name = document.getElementById('first name')
const last_name = document.getElementById('last name')
const passowrd = document.getElementById('passowrd')
const email_user = document.getElementById('email user')

form.addEventListener('submit', (e) => {
  let messages = []
  if (first_name.value === '' || first_name.value == null) {
    messages.push('Name is required')
  }
  
  if (last_name.value === '' || last_name.value == null) {
    messages.push('Name is required')
  }
})