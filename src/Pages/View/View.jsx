import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentById } from "../../api/index.js"; 

import "./View.css";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentById = async (id) => {
    //
    setIsLoading(true);
    try {
      const student = await fetchStudentById(id);
      setStudent(student);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    getStudentById(id);
  }, [id]);

  return (
    <div className="post__wrapper">
      <div className="container">
        {isError ? ('Произошла ошибка!') : (
          <div className="post">
            <p>Имя: {student.first_name}</p>
            <p>Фамилия: {student.last_name}</p>
            <p>Очество: {student.midle_name}</p>
            <p>Пол: {student.sex}</p>
            <p>Дата рождения: {student.birthday}</p>
            <p>Email: {student.email}</p>
            <p>Группа: {student.group_name}</p>
            <button 
              onClick={() => navigate(`/`)} 
              className="btn btn-primary"
            >
              На главную
            </button>
          </div>
       )}
      </div>
    </div>
  );
};

export default View;