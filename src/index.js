// // On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// The dog should be put on the table as a table row. The HTML might look something like this:
// <tr>
//   <td>Dog *Name*</td>
//   <td>*Dog Breed*</td>
//   <td>*Dog Sex*</td>
//   <td><button>Edit</button></td>
// </tr>
// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// Add event listener to each edit button.
// queryselect these:
/* <input type="text" name="name" placeholder="dog's name" value="" />
<input type="text" name="breed" placeholder="dog's breed" value="" />
<input type="text" name="sex" placeholder="dog's sex" value="" /> */
// Inside the edit click event, enter the name, breed and sex respectively as the value of each of these input fields.
// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/`${id}` to update the dog information (including name, breed and sex attributes).



fetch("http://localhost:3000/dogs")
.then(response => response.json())
.then(dogs => {
    
    dogs.forEach(dog => {
        createTable(dog);
    });
})

let selectedDogId;

function createTable(dog) {
    
    const trTag = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdBreed = document.createElement("td");
    const tdSex = document.createElement("td");
    const tdEdit = document.createElement("td");
    const editButton = document.createElement("button");

    tdName.textContent = dog.name;
    tdBreed.textContent = dog.breed;
    tdSex.textContent = dog.sex;
    editButton.textContent = "Edit";
    trTag.id = `tr-dog-${dog.id}`;

    tdEdit.append(editButton);
    trTag.append(tdName, tdBreed, tdSex, tdEdit);
    document.querySelector("#table-body").append(trTag);

    editButton.addEventListener("click", event => {
        console.log("Click");
        document.querySelector("input[name='name']").value = dog.name;
        document.querySelector("input[name='breed']").value = dog.breed;
        document.querySelector("input[name='sex']").value = dog.sex;
        selectedDogId = dog.id;
    })
}

const form = document.querySelector("#dog-form");

form.addEventListener("submit", event => {
    event.preventDefault();

    editedDogObject = {
        "name": event.target[0].value,
        "breed": event.target[1].value,
        "sex": event.target[2].value
    }

    fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editedDogObject)
    })

    // let tableRow = document.querySelector(`#tr-dog-${selectedDogId}`)
    // tableRow.children[0].textContent = event.target[0].value;
    // tableRow.children[1].textContent = event.target[1].value;
    // tableRow.children[2].textContent = event.target[2].value;
    // console.log(tableRow);
    
    form.reset();

    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(updatedDogs => {
        
        updatedDogs.forEach(dog => {
            let tableRow = document.querySelector(`#tr-dog-${dog.id}`)
            tableRow.children[0].textContent = dog.name;
            tableRow.children[1].textContent = dog.breed;
            tableRow.children[2].textContent = dog.sex;
        });
    })

})



// document.addEventListener('DOMContentLoaded', () => {

// })