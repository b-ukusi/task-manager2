const openModalButtons = document.querySelectorAll('[data-modal-target2]')
const closeModalButtons = document.querySelectorAll('[data-close-button2]')
const overlay = document.getElementById('overlay')
//const createClientButton = document.getElementById('create-client-button')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal2 = document.querySelector(button.dataset.modal2Target)
    openModal2(modal2)
  })              
})

overlay.addEventListener('click', () => {
  const modals2 = document.querySelectorAll('.modal2.active')
  modals.forEach(modal2 => {
    closeModal2(modal2)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal2 = button.closest('.modal2')
    closeModal2(modal2)
  })
})


//createClientButton.addEventListener('click', () => {
  //const modal = document.getElementById('modal');
 // closeModal(modal);
//});

function openModal2(modal2) {
  if (modal == null) return
  modal2.classList.add('active')
  overlay.classList.add('active')
}

function closeModa2(modal2) {
  if (modal == null) return
  modal2.classList.remove('active')
  overlay.classList.remove('active')
}