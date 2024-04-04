const form = document.getElementById('animal-form')
const nameInput = document.querySelector('[name=name]')
const typeInput = document.querySelector('[name=animalTypeId]')
const ageInput = document.querySelector('[name=age]')



const handleSubmit = (e) => {
  e.preventDefault();

  const newAnimal  = {
    name: nameInput.value,
    animalTypeId: parseInt(typeInput.value),
    age: parseInt(ageInput.value)
  }
  form.reset()
  
  fetch('api/animals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnimal)
  })
  .then((response) => response.json())
  .then((data) => {
    window.location.replace('/')
  })
  .catch((err) => console.error(err))
}
  

form.addEventListener('submit', handleSubmit)