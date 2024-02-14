const select = document.querySelector('select')
const animalContainer = document.getElementById('animals-container')

const renderAnimals = (animals) => {
  animalContainer.innerHTML =''
  animals.forEach(animal => {
    const li = document.createElement('li')
    li.innerHTML = `
    <h2 style="color:rgb(119, 0, 0)">${animal.name}</h2>
    <p style="color:Black">Type: ${animal.type} | Age: ${animal.age}</p>
    `
    animalContainer.appendChild(li)
  })
}

// select.addEventListener('change', (e) => {
//   const animalType = e.target.value

//   fetch(`/api/animal/${animalType}`)
//     .then(response => response.json())
//     .then(animals => renderAnimals(animals))
//     .catch(err => console.error(err))
// })

// fetch all animals on pageload
fetch('/api/animals')
.then(response => response.json())
.then(animals => renderAnimals(animals))
.catch(err => console.error(err))