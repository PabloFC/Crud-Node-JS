import express from "express";
import { pool } from "./database/connectionMysql.js";
import cors from "cors";

// crear nuestra app
const app = express();
app.use(express.json());
app.use(cors());
//puerto del servidor
const PORT = 3000;

async function getStudents() {
  try {
    const result = await pool.query("select * from students");
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

app.get("/student", async (req, res) => {
  try {
    const result = await getStudents();
    res.send(result);
  } catch (error) {
    console.error("Error al realizar la consulta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

async function getStudentsById(id) {
  try {
    const result = await pool.query(`select * from students where id=${id}`);
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

app.get("/students/:id", async (req, res) => {
  try {
    const result = await getStudentsById(req.params.id);
    res.send(result[0]);
  } catch (error) {
    console.error("Error al realizar la consulta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

async function addStudent({ name, lastname, gender, age }) {
  try {
    await pool.query(
      "INSERT INTO students (name, lastname, gender, age) " +
        "VALUES (?,?,?,?)",
      [name, lastname, gender, age]
    );
    return "Estudiante añadido añadido";
  } catch (error) {
    console.error(error);
  }
}

app.post("/add-student", async (req, res) => {
  try {
    const result = await addStudent(req.body);
    res.send(result);
  } catch (error) {
    console.error("Error al realizar la consulta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

async function updateStudent(student, id) {
  try {
    await pool.query("update students set ? WHERE id = ?", [student, id]);
    return "Estudiante Editado";
  } catch (error) {
    console.error(error);
  }
}
app.put("/student/:id", async (req, res) => {
  try {
    const result = await updateStudent(req.body, req.params.id);
    res.send(result);
  } catch (error) {
    console.error("Error al realizar la consulta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//aqui si le paso el {id} se esta desestructurando del req.body si no le pasaria el id de forma normal y pondria req.body.id
async function deleteStudent({ id }) {
  try {
    await pool.query("DELETE FROM students WHERE id = ?", [id]);
    return "Estudiante eliminado";
  } catch (error) {
    console.error(error);
  }
}

app.delete("/student", async (req, res) => {
  try {
    const result = await deleteStudent(req.body);
    res.send(result);
  } catch (error) {
    console.error("Error al realizar la consulta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//INICIA EL SERVIDOR PARA VERLO EN THUNDER
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
