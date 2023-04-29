import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentById, addOrUpdateStudent, fetchGroups } from "../../api/index.js"; 
import axios from "axios";
import "./Student.css";

const Student = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [student, setStudent] = useState({
      "method" : "",
      "first_name": "",
      "last_name": "",
      "midle_name": "",
      "birthday": "",
      "sex": "",
      "email": "",
      "group_id": ""
  });
  const [groups, setGroups] = useState([])

  const getGroups = async () => {
    //
    try {
      const groups = await fetchGroups();
      setGroups(groups);
    } catch(error) {
      setIsError(true);
    }
  };

  const getStudent = async (id) => {
    //
    try {
      const student_update = await fetchStudentById(id);
      setStudent(student_update);
    } catch(error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getGroups();
    if (id === "new") return;
    getStudent(id);
  }, []);

  const handleChange = (e) => {
    const postClone = { ...student };
    postClone[e.target.name] = e.target.value;
    setStudent(postClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id !== "new") {
      const postClone = { ...student };
      postClone['_method'] = 'PUT';
      setStudent(postClone);
    }
    const student_id = await addOrUpdateStudent(student);
    return navigate(`/view/${student_id}`);
  };

  return (
    <div className="post__wrapper">
      <div className="container">
      <form className="post">
          <input
            type="text"
            placeholder="Name..."
            name="first_name"
            value={student.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Surname..."
            name="midle_name"
            value={student.midle_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Patronymic..."
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Birthday..."
            name="birthday"
            value={student.birthday}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Sex..."
            name="sex"
            value={student.sex}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email..."
            name="email"
            value={student.email}
            onChange={handleChange}
          />
          {
            id === "new" ?
                <select name="group_id" onChange={handleChange}>
                  <option value={null} selected> - </option>
                  {
                    groups.map(group =>  <option value={group.id}>{group.name}</option>)
                  }

                </select>
                :
                <select name="group_id" onChange={handleChange}>
                  {
                    groups.map(group => 
                          group.id === student.group_id 
                          ? <option value={group.id} selected>{group.name}</option> 
                          : <option value={group.id}>{group.name}</option> 
                      )
                  }

                </select>
          }
          <button 
          onClick={handleSubmit} 
          className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Student;