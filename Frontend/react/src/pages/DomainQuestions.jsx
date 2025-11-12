import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestions, saveAnswers } from '../api'

export default function DomainQuestions() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    getQuestions(id)
      .then(res => {
        setQuestions(res.data)
        const initial = {}
        res.data.forEach(q => {
          initial[q.id] = { answer: '', comment: '', file: null }
        })
        setAnswers(initial)
      })
      .catch(err => console.error(err))
  }, [id])

  const handleAnswerChange = (qid, value) => {
    setAnswers(prev => ({
      ...prev,
      [qid]: { ...prev[qid], answer: value },
    }))
  }

  const handleCommentChange = (qid, value) => {
    setAnswers(prev => ({
      ...prev,
      [qid]: { ...prev[qid], comment: value },
    }))
  }

  const handleFileChange = (qid, file) => {
    setAnswers(prev => ({
      ...prev,
      [qid]: { ...prev[qid], file },
    }))
  }

 const handleSave = async () => {
  const formData = new FormData();

  Object.keys(answers).forEach(qid => {
    const ans = answers[qid];
    if (ans.answer) {
      formData.append('question', qid);
      formData.append('answer', ans.answer);
      if (ans.comment) formData.append('comment', ans.comment);
      if (ans.file) formData.append('file', ans.file);
    }
  });

  try {
    await saveAnswers(formData);
    alert('✅ Answers saved successfully!');
  } catch (err) {
    console.error(err);
    alert('❌ Failed to save answers');
  }
};

  return (
    <div>
      <h2>Compliance Assessment</h2>
      {questions.map(q => (
        <div key={q.id} style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          background: 'white',
        }}>
          <p><b>{q.question_text}</b></p>
          <div>
            <label>
              <input
                type="radio"
                name={`q-${q.id}`}
                value="Yes"
                checked={answers[q.id]?.answer === 'Yes'}
                onChange={() => handleAnswerChange(q.id, 'Yes')}
              /> Yes
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                name={`q-${q.id}`}
                value="No"
                checked={answers[q.id]?.answer === 'No'}
                onChange={() => handleAnswerChange(q.id, 'No')}
              /> No
            </label>
          </div>

          {answers[q.id]?.answer === 'Yes' && (
            <div style={{ marginTop: 10 }}>
              <label>Upload Document:</label>
              <input type="file" onChange={(e) => handleFileChange(q.id, e.target.files[0])} />
            </div>
          )}

          {answers[q.id]?.answer === 'No' && (
            <div style={{ marginTop: 10 }}>
              <label>Add Comment:</label>
              <textarea
                rows="3"
                placeholder="Write your comment here..."
                style={{ width: '100%', marginTop: 4 }}
                onChange={(e) => handleCommentChange(q.id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSave} style={{
        background: '#4B0E0E',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: 6,
      }}>Save</button>
    </div>
  )
}
