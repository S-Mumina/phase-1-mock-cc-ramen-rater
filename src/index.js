// write your code here// index.js

    document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000";
    const ramenMenu = document.getElementById("ramen-menu");
    const ramenDetail = document.getElementById("ramen-detail");
    const newRamenForm = document.getElementById("new-ramen");
  
    // Function to fetch all ramens from the API and display them in the ramen menu
    function fetchAndDisplayRamens() {
      fetch(`${BASE_URL}/ramens`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((ramen) => {
            const img = document.createElement("img");
            img.src = ramen.image;
            img.alt = ramen.name;
            img.addEventListener("click", () => showRamenDetail(ramen.id));
            ramenMenu.appendChild(img);
          });
        })
        .catch((error) => console.error("Error fetching ramens:", error));
    }
  
    // Function to display the details of a specific ramen in the ramen detail section
    function showRamenDetail(ramenId) {
      fetch(`${BASE_URL}/ramens/${ramenId}`)
        .then((response) => response.json())
        .then((ramen) => {
          ramenDetail.innerHTML = `
            <img src="${ramen.image}" alt="${ramen.name}">
            <h2>${ramen.name}</h2>
            <h3>Restaurant: ${ramen.restaurant}</h3>
            <p>Rating: ${ramen.rating}</p>
            <p>Comment: ${ramen.comment}</p>
          `;
        })
        .catch((error) => console.error("Error fetching ramen detail:", error));
    }
  
    // Function to handle form submission and create a new ramen
    function createNewRamen() {
      newRamenForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(newRamenForm);
        const newRamen = {
          image: formData.get("image-url"),
          name: formData.get("name"),
          restaurant: formData.get("restaurant"),
          rating: formData.get("rating"),
          comment: formData.get("comment"),
        };
  
        fetch(`${BASE_URL}/ramens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRamen),
        })
          .then(() => {
            // After successfully adding the new ramen, update the menu to display it
            fetchAndDisplayRamens();
            // Clear the form fields for the next submission
            newRamenForm.reset();
          })
          .catch((error) => console.error("Error creating new ramen:", error));
      });
    }
  
    // Call the initial functions to fetch and display existing ramens and handle form submission
    fetchAndDisplayRamens();
    createNewRamen();// Get all the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    
    // Add event listener to each delete button
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const ramenId = event.target.dataset.id;
        deleteRamen(ramenId);
      });
    });
    


  });
  

