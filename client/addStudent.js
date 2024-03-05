const name = document.getElementById("nombre");
const lastname = document.getElementById("apellido");
const age = document.getElementById("edad");
const gender = document.getElementById("genero");
const button = document.querySelector(".btn");
console.log(button);

button.addEventListener("click", (e) => addStudent(e));

async function addStudent(e) {
  try {
    e.preventDefault();
    const addStudent = await fetch(`http://localhost:3000/add-student`, {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        lastname: lastname.value,
        gender: gender.value,
        age: age.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log(addStudent);
  } catch (error) {
    console.log("Error " + error);
  }
}
