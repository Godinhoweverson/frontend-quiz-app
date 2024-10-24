const pickSubjectBtn = document.querySelectorAll('.pick a');
const titleDisplay = document.querySelector('.question-type p');
const iconSubject = document.querySelector('.question-type');
const questionsHeanding = document.querySelector('.questions h1');
const btnOptionsParagraph = document.querySelectorAll('.answers p');
const btnOptions = document.querySelectorAll('.answers');
const submitAnswer = document.querySelector('#submit-answer');
const multChoice = document.querySelector('#mult-choice');

let correctAnswer;
let selectedAnswer = null; 
let elementSelected = null;
let count = 0;

const increementCount =() =>{
  count++
} 


// SLIDER
const range = () =>{
  const slider = document.getElementById('range');
  if(slider){
    const tempSliderValue = getCount();
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
  // Reset the title display and icon
  titleDisplay.innerHTML = '';
  iconSubject.innerHTML = ''; // Clear any existing icons
  correctAnswer = null;

  for(items of Object.entries(data)){
    for(let i = 0; i < 4; i++){
      if(items[1][i].title === selectedSubject){
        titleDisplay.innerHTML = items[1][i].title
        const img = document.createElement('img')
        img.src = `${items[1][i].icon}`
        img.style = 'width:56px; heigth:56px;'
        iconSubject.prepend(img)
        displayQuestions(items[1][i].questions[getCount()]);
        correctAnswer = items[1][i].questions[getCount()];
      }
    }
  }
}

const displayQuestions = (questions) => {
  questionsHeanding.innerHTML = questions.question
  for(let i = 0; i < btnOptions.length; i++){
    btnOptionsParagraph[i].textContent = questions.options[i]
  }
  getValueBtnOptions(btnOptionsParagraph)
}

// Get value from Answer selected
const getValueBtnOptions = (answer) => {
  answer.forEach(el => {
    el.addEventListener('click', () => {

      // RESET ALL VALUES
      answer.forEach((btn) => {
        btn.parentNode.style = ''; // Reset border
        btn.previousElementSibling.style.backgroundColor = ''; // Reset background
        btn.previousElementSibling.style.color = ''; // Reset text color
      });

      elementSelected = el; // Set the selected element
      selectedAnswer = el.textContent; // Set the selected answer

      // Apply styles to the selected element
      el.parentNode.style.border = '2px solid #A729F5';
      el.previousElementSibling.style.backgroundColor = '#A729F5';
      el.previousElementSibling.style.color = '#fff';
    });
  });
};

// This If statement checks if the submitAnswer element exists 
// to avoid errors when trying to add an event listener to a null element
if(submitAnswer){

    // Submit the answer
  const submitAnswerBtn = () => {
    submitAnswer.addEventListener('click', () => {

      const notSelected = document.querySelector('#notSelected');
      
      if(notSelected){
        notSelected.remove();
      }

      if (!selectedAnswer) {
       
        const screenSize = window.innerWidth;
        const div = document.createElement('div');
        div.id = 'notSelected';
        div.style = 'display:flex; justify-content:center; align-items:center; width:100%; margin-top:32px';
        
        const p = document.createElement('p');
        p.style = 'color:#EE5454; margin-left:8px; margin-bottom:3px; line-height:150%;'
        p.innerHTML = 'Please select an answer';

        div.appendChild(p);

        const divSvg = document.createElement('div');
        if(screenSize < 800){
          divSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'
    
        }else{
          divSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'
        }
        
    
        div.insertBefore(divSvg,p)
        multChoice.appendChild(div)
        return;
      }
      // Call the function to check if answer selected is correct or incorrect 
      // pass the following parameters:
      // CorrectAnswer : Correct answer for each question
      // SelectAnswer: The answer option the user selected
      // elementSelect: used too change the border of btn selected
      answerIsCorrect(correctAnswer, selectedAnswer, elementSelected);
    });
  }
  submitAnswerBtn()
}


const answerIsCorrect = (correctAnswer, selectedAnswer, elementSelected) => {
  if(correctAnswer.answer === selectedAnswer){
    // CORRECT ANSWER
    console.log(selectedAnswer)
    const removeSvg = document.querySelector('#removeSvg');
    if(removeSvg){
      removeSvg.remove();
    }
    elementSelected.parentNode.style = 'border: 2px solid #26D782; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#26D782';

    const div = document.createElement('div');
    div.id = 'removeSvg';
    div.style = 'margin-right:20px'
    const screenSize = window.innerWidth;
    if(screenSize < 800){
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>'
    }else{
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>'
    }
    elementSelected.parentNode.appendChild(div)

    // The Submit answer will change to Next Question
    submitAnswer.textContent = 'Next Question'

    btnNextQuestion()

    // The function to incremment the count variable to use on the logic to go two next questio
    increementCount() 
    
    // Reset All values for next question
    if(removeSvg){ 
      const removeSvg = document.querySelector('#removeSvg');
      removeSvg.remove();
      elementSelected.parentNode.style = '';
      elementSelected.previousElementSibling.style.backgroundColor = '';
      elementSelected.previousElementSibling.style.color = '#626C7F';
    }
  }else{
     // INCORRECT ANSWER

    const removeSvg = document.querySelector('#removeSvg');
    if(removeSvg){
      removeSvg.remove();
    }
    elementSelected.parentNode.style = 'border: 2px solid #EE5454; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#EE5454';
    const div = document.createElement('div');
    div.id = 'removeSvg';
    div.style = 'margin-right:20px'
    const screenSize = window.innerWidth;
    if(screenSize < 800){
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'

    }else{
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'
    }
    elementSelected.parentNode.appendChild(div)
    
     // The Submit answer will change to Next Question
     submitAnswer.textContent = 'Next Question'

     btnNextQuestion()
 
     // The function to incremment the count variable to use on the logic to go two next questio
     increementCount() 
     
     // Reset All values for next question
     if(removeSvg){ 
       const removeSvg = document.querySelector('#removeSvg');
       removeSvg.remove();
       elementSelected.parentNode.style = '';
       elementSelected.previousElementSibling.style.backgroundColor = '';
       elementSelected.previousElementSibling.style.color = '#626C7F';
     }
  }
}

const btnNextQuestion = () =>{
  submitAnswer.addEventListener('click', () => {
    quizzes()
  });
}
function getCount() {
  return count;
}


// when click on next question have to change the question and options
// Update Question 1 of 10 based in wich question.
