const url = new URL(document.location.href);
const id = url.searchParams.get("Id");

console.log(id);

const data = document.querySelector("#form");
const name = document.getElementById("nombre");
const lastname = document.getElementById("apellido");
const age = document.getElementById("edad");
const gender = document.getElementById("genero");
const button = document.querySelector(".btn");

button.addEventListener("click", (e) => editStudent(e, id));

console.log(data, name, lastname, age, gender);

async function studentsData(id) {
  try {
    const response = await fetch(`http://localhost:3000/students/${id}`);
    const student = await response.json();
    console.log(student);

    name.value = student.name;
    lastname.value = student.lastname;
    age.value = student.age;
    gender.value = student.gender;
  } catch (error) {
    console.log("Error " + error);
  }
}

studentsData(id);

async function editStudent(e, id) {
  try {
    e.preventDefault();
    const editStudent = await fetch(`http://localhost:3000/student/${id}`, {
      method: "PUT",
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
    console.log(editStudent);
  } catch (error) {
    console.log("Error " + error);
  }
}
