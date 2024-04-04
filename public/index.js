const select = document.querySelector('select')
const animalContainer = document.getElementById('animals-container')

const renderAnimals = (animals) => {
  console.log(animals)
  animalContainer.innerHTML =''
  animals.forEach(animal => {
    const li = document.createElement('li')
    li.innerHTML = `
    <div class="card">
      <h2 style="color:rgb(119, 0, 0)">${animal.name}</h2>
      <p style="color:Black">Type: ${animal.animalType} | Age: ${animal.age}</p>
      <button data-id="${animal.id}">X</button>
    </div>
    `
    animalContainer.appendChild(li)
  })
}

select.addEventListener('change', (e) => {
  const animalType = e.target.value

  fetch(`/api/animals/${animalType}`)
    .then(response => response.json())
    .then(animals => renderAnimals(animals))
    .catch(err => console.error(err))
})

animalContainer.addEventListener('click', (e) => {
  if(e.target.matches('button')) {
    const id = e.target.dataset.id;
    fetch(`/api/animals/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => getAllAnimals())
      .catch(err => {
        // Create a container for error message and image
        const errorContainer = document.createElement('div');
        errorContainer.style.textAlign = 'center'; // Center align the content
        const errorImage = document.createElement('img');
        errorImage.src = './assets/silly-cat.png'; // Path to your error image
        errorImage.style.maxWidth = '100%'; // Make the image responsive
        errorContainer.appendChild(errorImage);
        
        const errMessage = document.createElement('h1');
        errMessage.style.fontSize = '24px'; // Adjust font size
        errMessage.innerHTML = `
        <span style="color:red">uh oh!</span>: "Something went wrong on our end... Please try again later"
        <br><br>
        <a href="/">
          <button style="margin-top: 33px;">Return Home</button>
        </a>

        `;
        errorContainer.appendChild(errMessage);

        animalContainer.innerHTML = ''; // Clear existing content
        animalContainer.appendChild(errorContainer);
      });
  }
});

function getAllAnimals(){
  fetch('/api/animals')
.then(response => response.json())
.then(animals => renderAnimals(animals))
.catch(err => console.error(err))
}

// fetch all animals on pageload
getAllAnimals()