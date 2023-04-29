import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudents, deleteStudent } from "../../api/index.js"; 
import "./Students.css";

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getStudents = async () => {
    //
    setIsLoading(true);
    try {
      const students = await fetchStudents();
      setStudents(students);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (student) => {
    setIsLoading(true);
    try{
      deleteStudent(student.id); 
      setStudents(students.filter((item) => item.id !== student.id));
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  };


  return (
    <div className="posts">
      <div className="container">
        <button
          onClick={() => navigate("/post/new")}
          className="btn btn-primary mb-4"
        >
          New Post
        </button>
        <table className="table">
                <thead>
                <tr>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Очество</th>
                  <th>Пол</th>
                  <th>Email</th>
                  <th>Группа</th>
                  <th>Изменить</th>
                  <th>Осмотреть</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => 
                    <tr key={student.id}>
                      <td> {student.first_name} </td>
                      <td> {student.last_name} </td>
                      <td> {student.midle_name} </td>
                      <td> {student.sex} </td>
                      <td> {student.email} </td>
                      <td> {student.group_name} </td>
                      <td>
                        <button onClick={() => navigate(`/post/${student.id}`)} className="btn btn-primary">Изменить</button> 
                      </td>
                      <td>
                        <button onClick={() => navigate(`/view/${student.id}`)} className="btn btn-warning">Осмотреть</button> 
                      </td>
                      <td>
                        <button onClick={() => handleDelete(student)} className="btn btn-danger" >Удалить</button>
                      </td>
                    </tr>
                  )}
                </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;