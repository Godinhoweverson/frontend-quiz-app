const pickSubjectBtn = document.querySelectorAll('.pick a');
const titleDisplay = document.querySelector('.question-type p');
const iconSubject = document.querySelector('.question-type');
const questionsHeanding = document.querySelector('.questions h1');
const btnOptionsParagraph = document.querySelectorAll('.answers p');
const btnOptions = document.querySelectorAll('.answers');
const submitAnswer = document.querySelector('#submit-answer');

let correctAnswer;

// SLIDER
const range = () =>{
  const slider = document.getElementById('range');
  if(slider){
    const tempSliderValue = 3;
    const max = slider.max; 
    const progress = (tempSliderValue / max) * 100; 
    slider.style.background = `linear-gradient(to right, #A729F5 ${progress}%, #fff ${progress}%)`;
  }
}

range()

// Get the subject selected and set on localStorage
const btnValue = () =>{
  pickSubjectBtn.forEach((el) =>{
    el.addEventListener('click',()=>{
      let valueSubject = el.textContent
      localStorage.setItem('selectedSubject', valueSubject);
    })
  })
}
btnValue()


// Get the Subject selected from localStorage
const selectedSubject = localStorage.getItem('selectedSubject');
if(selectedSubject){
  localStorage.removeItem('selectedSubject');
}
   

// . Get the data from Json 
let data;
fetch('./data.json')
  .then((res) => res.json())
  .then((json) => {
    data = json;
    quizzes()
})
.catch((error) => console.error('Error fetching data:', error));

const quizzes = () =>{
  for(items of Object.entries(data)){
    for(let i = 0; i < 4; i++){
      if(items[1][i].title === selectedSubject){
        titleDisplay.innerHTML = items[1][i].title
        const img = document.createElement('img')
        img.src = `${items[1][i].icon}`
        img.style = 'width:56px; heigth:56px;'
        iconSubject.prepend(img)
        displayQuestions(items[1][i].questions[0]);
        correctAnswer = items[1][i].questions[0];
      }
    }
  }
}

const displayQuestions = (questions) => {
  questionsHeanding.innerHTML = questions.question
  for(let i = 0; i < btnOptions.length; i++){
    btnOptionsParagraph[i].innerHTML = questions.options[i]
  }
  getValueBtnOptions(btnOptionsParagraph)
  
}

// Get value from Answer selected

const getValueBtnOptions = (answer)=>{
  answer.forEach(el => {
    el.addEventListener('click', () =>{
      
      //RESET ALL VALUES
      answer.forEach((btn)=>{
        btn.parentNode.style = ''
        btn.previousElementSibling.style.backgroundColor = '';
        btn.previousElementSibling.style.color = '';
      })
      let elementSelected = el;
      let selectedAnswer = el.textContent
      submitAnswerBtn(elementSelected,selectedAnswer)
      el.parentNode.style = 'border: 2px solid #A729F5;'
      el.previousElementSibling.style.backgroundColor = '#A729F5';
      el.previousElementSibling.style.color = '#fff ';
    });
  
  });
};

// Submit the answer
const submitAnswerBtn = (elementSelected,selectedAnswer) =>{
  submitAnswer.addEventListener('click',() =>{
    answerIsCorrect(correctAnswer, selectedAnswer, elementSelected)
  
  })
}

const answerIsCorrect = (correctAnswer, selectedAnswer, elementSelected) => {
  if(correctAnswer.answer === selectedAnswer){
    // CORRECT ANSWER
    elementSelected.parentNode.style = 'border: 2px solid #26D782; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#26D782';
    const div = document.createElement('div');
    div.style = 'margin-right:20px'
    const screenSize = window.innerWidth;
    if(screenSize < 800){
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>'
    }else{
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>'
    }
    elementSelected.parentNode.appendChild(div)
    submitAnswer.textContent = 'Next Question'
  }else{
     // INCORRECT ANSWER
    elementSelected.parentNode.style = 'border: 2px solid #EE5454; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#EE5454';
    const div = document.createElement('div');
    div.style = 'margin-right:20px'
    const screenSize = window.innerWidth;
    if(screenSize < 800){
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'

    }else{
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'
    }
    elementSelected.parentNode.appendChild(div)
    submitAnswer.textContent = 'Next Question'
  }
}

// CORRECT! 
// change the color of border to green ok
// the letter box color and add the icon ok
// FIX THE Padding ok

//INCORRECT!
// change the color of border to OKok
// the letter box color and add the icon ok

//CHange the SUBMit  BTN to next question ok

// If the user click on submit btn before selected send a alert

// 

