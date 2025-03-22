document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById("dog-image-container");
    const breedContainer = document.getElementById("dog-breeds");
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    

fetch(imgUrl)
  .then(response => response.json())
  .then(data => {
    data.message.forEach((imageUrl) => {
      let img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Random Dog";
      img.style.width = "200px"; // Optional: Adjust size
      img.style.margin = "10px"; // Optional: Add spacing
      imageContainer.appendChild(img);
    });
  })
  .catch((error) => console.error("Error fetching dog images:", error));

  //const breedUrl = "https://dog.ceo/api/breeds/list/all";

// fetch(breedUrl)
//   .then(response => response.json())
//   .then(data => {
    
//     Object.keys(data.message).forEach((breed) => {
//       let li = document.createElement("li");
//       li.textContent = breed; // Set breed name
//       li.style.margin = "10px"; // Optional: Add spacing
//       breedContainer.appendChild(li);

//       // Add event listener to change color when clicked
//       li.addEventListener("click", () => {
//         li.style.color = li.style.color === "blue" ? "black" : "blue"; // Toggle color
//       });
//     });
//   })
//   .catch((error) => console.error("Error fetching dog breeds:", error));

const breedUrl = "https://dog.ceo/api/breeds/list/all";
let allBreeds = {}; // Store all breeds

fetch(breedUrl)
  .then(response => response.json())
  .then(data => {
    allBreeds = data.message; // Store breeds for filtering
    renderBreeds(Object.keys(allBreeds)); // Initial render of all breeds
  })
  .catch((error) => console.error("Error fetching dog breeds:", error));

function renderBreeds(breeds) {
   breedContainer.innerHTML = ""; // Clear previous list

  breeds.forEach((breed) => {
    let li = document.createElement("li");
    li.textContent = breed;
    li.style.margin = "10px";

    // Click event to change color
    li.addEventListener("click", () => {
      li.style.color = li.style.color === "blue" ? "black" : "blue";
    });

    breedContainer.appendChild(li);
  });
}

// Dropdown event listener for filtering breeds
document.getElementById("breed-dropdown").addEventListener("change", (event) => {
  const selectedLetter = event.target.value;
  const filteredBreeds = Object.keys(allBreeds).filter(breed => breed.startsWith(selectedLetter));
  renderBreeds(filteredBreeds);
});


})