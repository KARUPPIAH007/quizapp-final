import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditFormComponent() {
  const [question_id, setQuestionId] = useState('');
  const [formData, setFormData] = useState(null);
  const [examId, setExamId] = useState('');

  const handleQuestionIdChange = (e) => {
    setQuestionId(e.target.value);
  };

  const handleExamIdChange = (e) => {
    setExamId(e.target.value);
  };

  const fetchQuestionDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8888/tests?examId=${examId}`);
      const exam = response.data[0];

      if (!exam) {
        alert(`Exam with ID "${examId}" not found`);
        return;
      }
      
      const question = exam.questions.find(q => q.questionId === question_id);

      if (!question) {
        alert(`Question with ID "${question_id}" not found`);
        return;
      }

      setFormData({
        examId,
        questionId: question.questionId,
        question: question.question,
        option1: question.options[0],
        option2: question.options[1],
        option3: question.options[2],
        option4: question.options[3],
        correctAnswer: question.correctAnswer
      });
    } catch (error) {
      console.error('There was an error fetching the question data!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8888/tests?examId=${formData.examId}`);
      const exam = response.data[0];

      if (!exam) {
        alert(`Exam with ID "${formData.examId}" not found`);
        return;
      }

      const updatedQuestions = exam.questions.map(q => {
        if (q.questionId === formData.questionId) {
          return {
            questionId: formData.questionId,
            question: formData.question,
            options: [formData.option1, formData.option2, formData.option3, formData.option4],
            correctAnswer: formData.correctAnswer
          };
        }
        return q;
      });

      const updatedExam = {
        ...exam,
        questions: updatedQuestions
      };

      await axios.put(`http://localhost:8888/tests/${exam.id}`, updatedExam);

      alert('Record updated successfully');
      setFormData(null);
      setQuestionId('');
      setExamId('');
    } catch (error) {
      console.error('There was an error updating the question data!', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded">
            <div className="card-header bg-primary text-white text-center">
              <h2>Edit Question</h2>
            </div>
            <div className="card-body">
              {!formData ? (
                <form onSubmit={fetchQuestionDetails}>
                  <div className="mb-3">
                    <label className="form-label">Enter Exam ID</label>
                    <input
                      type="text"
                      name="examId"
                      value={examId}
                      onChange={handleExamIdChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Question ID</label>
                    <input
                      type="text"
                      name="question_id"
                      value={question_id}
                      onChange={handleQuestionIdChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-2">Fetch Question</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Enter the Question</label>
                    <input
                      type="text"
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Option 1</label>
                      <input
                        type="text"
                        name="option1"
                        value={formData.option1}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Option 2</label>
                      <input
                        type="text"
                        name="option2"
                        value={formData.option2}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Option 3</label>
                      <input
                        type="text"
                        name="option3"
                        value={formData.option3}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Option 4</label>
                      <input
                        type="text"
                        name="option4"
                        value={formData.option4}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <input
                      type="text"
                      name="correctAnswer"
                      value={formData.correctAnswer}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFormComponent;
