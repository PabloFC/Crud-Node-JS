const rows = document.querySelector("#rows");
// const button = document.getElementsByTagName("button");
console.log(rows);
// console.log(button);

function myFetch(url) {
  return fetch(url).then((res) => {
    return res.json();
  });
}

async function showStudents() {
  try {
    const students = await myFetch("http://localhost:3000/student");
    console.log(students);

    for (let i = 0; i < students.length; i++) {
      rows.insertAdjacentHTML(
        "beforeend",
        ` <tr>
            <th scope="row">${students[i].id}</th>
            <td>${students[i].name}</td>
            <td>${students[i].lastname}</td>
            <td>${students[i].gender}</td>
            <td>${students[i].age}</td>
            <td><a class="btn btn-success" href="./editarEstudiante.html?Id=${students[i].id}">Editar</a></td>
            <td><button onclick="deleteStudent(${students[i].id})" class="btn btn-danger" >Borrar</button></td>
        </tr>
      `
      );
    }
  } catch (error) {
    console.log("Error " + error);
  }
}

showStudents();

async function deleteStudent(id) {
  try {
    const response = await fetch(`http://localhost:3000/student`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Has tenido el error" + error);
  }
}
