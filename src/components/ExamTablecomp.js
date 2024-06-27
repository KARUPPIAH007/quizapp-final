import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ExamTable() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExams, setSelectedExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    const selectedExamsFromStorage = JSON.parse(localStorage.getItem('selectedExams')) || [];
    setSelectedExams(selectedExamsFromStorage);
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8888/tests');
      setExams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (examId, isChecked) => {
    try {
      const updatedExams = exams.map(exam => {
        if (exam.examId === examId) {
          return { ...exam, status: isChecked };
        }
        return exam;
      });

      setExams(updatedExams);

      // Simulate PATCH request to update exam status
      // Replace with actual PATCH request to your API endpoint
      // await axios.patch(`http://localhost:8888/exams/${examId}`, { status: isChecked });

      const updatedSelectedExams = isChecked
        ? [...selectedExams, examId]
        : selectedExams.filter(id => id !== examId);
      setSelectedExams(updatedSelectedExams);
      localStorage.setItem('selectedExams', JSON.stringify(updatedSelectedExams));
    } catch (error) {
      console.error('Error updating exam status:', error);

      // Rollback changes on error (optional)
      setExams(exams); // Reset to previous state
      // Handle error display or rollback UI changes
    }
  };

  const isSelected = (examId) => {
    return selectedExams.includes(examId);
  };

  return (
    <div className="container mt-5">
      <h2>Exam List</h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="table-dark">
            <th>Exam ID</th>
            <th>Exam Name</th>
            <th>Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Loading...</td>
            </tr>
          ) : exams.length > 0 ? (
            exams.map((exam) => (
              <tr key={exam.examId}>
                <td>{exam.examId}</td>
                <td>{exam.examName}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(exam.examId, e.target.checked)}
                    checked={isSelected(exam.examId)}
                  />
                </td>
                <td>
                <Link to="/maindashboard/editquestioncomponent" variant="body2">Edit
                </Link>
                  {' '}
                  <button className="btn btn-outline-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No exams found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExamTable;
