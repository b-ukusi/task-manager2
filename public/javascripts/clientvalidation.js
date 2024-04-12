
const first_name = document.getElementById('first-name')
const last_name = document.getElementById('last name')
const password = document.getElementById('password')
const email_user = document.getElementById('email user')
const form = document.getElementById('create-client-form')

const errPass = document.getElementById('err-pass')

form.addEventListener('submit', (e) => {
  console.log(password.value)
  if (password.value.length < 6) {
    console.log('****')
    errPass.innerHTML = '<p class="err-text"> too short! </p>'
    return
  }
  //  let messages = []
  // if (first_name.value === '' || first_name.value == null) {
  //   messages.push('Name is required')
  // }
  
  // if (last_name.value === '' || last_name.value == null) {
  //   messages.push('Name is required')
  // }
})