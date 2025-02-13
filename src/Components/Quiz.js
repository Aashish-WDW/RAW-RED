import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../Conf/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import styles from '../styles/Accordion.module.css';

const Quiz = () => {
  const questions = [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'Hyperlinks and Text Markup Language',
        'Home Tool Markup Language',
        'None of the above'
      ],
      correctAnswer: 'Hyper Text Markup Language'
    },
    {
      question: 'Which HTML tag is used to define an unordered list?',
      options: ['<ul>', '<ol>', '<li>', '<list>'],
      correctAnswer: '<ul>'
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Cascading Style Sheets',
        'Creative Style Sheets',
        'Colorful Style Sheets'
      ],
      correctAnswer: 'Cascading Style Sheets'
    },
    {
      question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
      options: ['title', 'alt', 'src', 'href'],
      correctAnswer: 'alt'
    },
    {
      question: 'In HTML, which tag is used to define a hyperlink?',
      options: ['<a>', '<link>', '<href>', '<p>'],
      correctAnswer: '<a>'
    }
  ];


  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOptionSelect = (index, option) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[index] = option;
      setAnswers(newAnswers);
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const score = calculateScore();

    const userId = user ? user.uid : null;
    if (userId) {
      const quizRef = collection(db, 'quizResults');
      try {
        await setDoc(doc(quizRef), {
          userId: userId,
          score: score,
          answers: answers,
          timestamp: new Date()
        });

        console.log('Quiz result saved to Firestore!');
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const score = calculateScore();

  return (
    <div className={styles.quiztxt}>
      <h1>QUIZ</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            <ul>
              {q.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleOptionSelect(index, option)}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button className={styles['comic-button']} type="submit" disabled={submitted}>Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          {score === questions.length && (
            <div>
              <Link href="/Home">
                <button className={styles['comic-button']}>Play Now</button>
              </Link>
              <Link href="/Dashboard">
                <button className={styles['comic-button']}>Dashboard</button>
              </Link>
            </div>
          )}
          {score !== questions.length && (
            <Link href="/Quiz">
              <button className={styles['comic-button']}>Learn More</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
