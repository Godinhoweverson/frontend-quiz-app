const pickSubjectBtn = document.querySelectorAll('.pick a');
const picks = document.querySelectorAll('.pick');
const titleDisplayQuizCompleted = document.querySelector('.question-type-completed');
const iconSubject = document.querySelector('.question-type');
const questionNumber = document.querySelector('.questionNumber');
const questionsHeanding = document.querySelector('.questions h1');
const btnOptionsParagraph = document.querySelectorAll('.answers p');
const btnOptions = document.querySelectorAll('.answers');
const submitAnswer = document.querySelector('#submit-answer');
const nextAnswer = document.querySelector('#next-answer');
const scorebtn = document.querySelector('#score-btn');
const multChoice = document.querySelector('#mult-choice');
const totalScore = document.querySelector('.total-score');
const iconQuizCompleted = document.querySelector('.subject');
const playAgainBtn = document.querySelector('#play-again');
const rScore = document.querySelector('#r-score');

const myCheckBox = document.querySelector('#myCheckBox');
const heading = document.querySelector('h1');
const body = document.querySelector('body');

let correctAnswer;
let selectedAnswer = null; 
let elementSelected = null;
let count = 0;
let correctAnswersCount  = 0;
let data;

// Theme swicth DARK OR LIGTH

// Applyu the dark theme
const applyStyles = () => {

  const screenSize = window.innerWidth;

  if (screenSize > 1024) {
    body.style.backgroundImage = `url(assets/images/pattern-background-desktop-dark.svg)`;
  } else if (screenSize > 524) {
    body.style.backgroundImage = 'url(assets/images/pattern-background-tablet-dark.svg)';
  } else {
    body.style.backgroundImage = 'url(assets/images/pattern-background-mobile-dark.svg)';
  }

  body.style.backgroundColor = '#313E51';
  body.style.color = '#fff';
  heading.style.color = '#fff';
  picks.forEach(pick =>{
    pick.style.backgroundColor = '#3B4D66';
  })
  pickSubjectBtn.forEach(pick =>{
    pick.style.color = '#fff';
  })

  if(btnOptions){
    btnOptions.forEach(el =>{
      el.style.backgroundColor = '#3B4D66';
      el.style.color = '#fff';
    })
  }
  if(rScore){
    rScore.style.backgroundColor ='#3B4D66';
  }
}

// Remove the DARK theme
const unApplyStyles = () => {
  body.style.backgroundImage = '';
  body.style.backgroundColor = '';
  body.style.backgroundSize = '';
  body.style.color = '';
  heading.style.color = '';
  picks.forEach(pick =>{
    pick.style.backgroundColor = '';
  })
  pickSubjectBtn.forEach(pick =>{
    pick.style.color = '';
  })

  if(btnOptions){
    btnOptions.forEach(el =>{
      el.style.backgroundColor = '';
      el.style.color = '';
    })
  }
  if(rScore){
    rScore.style.backgroundColor = '#fff';
  }
}

// Get the value from toggle btn and set on localStorage
myCheckBox.addEventListener('change', () => {
  if(myCheckBox.checked){
    applyStyles();
    localStorage.setItem('checked', 'true');
  }else{
    unApplyStyles();
    localStorage.setItem('checked', 'false');
  }
});

// Get the value from localStorage and checked if True or false, if is true will call the applyStyles() to apply the dark theme
window.addEventListener('load', () =>{
  const isChecked = localStorage.getItem('checked') === 'true';
  myCheckBox.checked = isChecked;
  if(isChecked){
    applyStyles();
  }
});

const increementCount =() =>{
  count++
} 

const increementCorrectAnswer = () =>{
  countCorrect++
}

// SLIDER
const range = () =>{
  const slider = document.getElementById('range');
  if(slider){
    const tempSliderValue = getCount() + 1;
    const max = slider.max; 
    const progress = (tempSliderValue / max) * 100; 
    slider.style.background = `linear-gradient(to right, #A729F5 ${progress}%, #fff ${progress}%)`;
  }
}

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

window.addEventListener('load', () => {
  // Check if this is the questionary.html or quizCompleted page and ensure that the DOM is ready
  if (questionNumber || totalScore) { 
      
    // . Get the data from Json 
   
    fetch('./data.json')
      .then((res) => res.json())
      .then((json) => {
        data = json;
        if(!totalScore){
          quizzes()
        }else{
          quizCompleted()
        }
    })
    .catch((error) => console.error('Error fetching data:', error));
  }
});


const quizzes = () =>{
  const selectedSubject = localStorage.getItem('selectedSubject');
 
  // Reset the title display and icon
  iconSubject.innerHTML = ''; // Clear any existing icons
  correctAnswer = null;
  if(!totalScore){
    for(items of Object.entries(data)){
      for(let i = 0; i < 4; i++){
        if(items[1][i].title === selectedSubject){

          const div = document.createElement('div');
          div.setAttribute('class', 'subjectTitle');
          div.innerHTML = items[1][i].title;
          iconSubject.appendChild(div)
      
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

  // RESET ALL VALUES
  selectedAnswer = '';
  elementSelected = '';
  answer.forEach(el => {
    el.parentNode.addEventListener('click', () => {

      // RESET ALL VALUES
      answer.forEach((btn) => {
        btn.parentNode.style.border = ''; // Reset border
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
 
    elementSelected.parentNode.style = 'border: 2px solid #26D782; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#26D782';

    
    //  // isChecked determines whether the background color is set to dark mode when the theme is applied.
    const isChecked = localStorage.getItem('checked') === 'true';
    if(isChecked){
      elementSelected.parentNode.style.backgroundColor = '#3B4D66';
      elementSelected.parentNode.style.color = '#fff';
    }
    // ////////////////////////////////////////////////////////////////
   
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

    btnNextQuestion()

    // The function to incremment the count variable to use on the logic to go two next questio
    increementCount() 
    
    correctAnswersCount++;
    localStorage.setItem('totalCorrect', correctAnswersCount);
 
  }else{
     // INCORRECT ANSWER
    elementSelected.parentNode.style = 'border: 2px solid #EE5454; justify-content:space-between;';
    elementSelected.previousElementSibling.style.backgroundColor = '#EE5454';

    // isChecked determines whether the background color is set to dark mode when the theme is applied.
    const isChecked = localStorage.getItem('checked') === 'true';
    if(isChecked){
      elementSelected.parentNode.style.backgroundColor = '#3B4D66';
      elementSelected.parentNode.style.color = '#fff';
    }
    // ///////////////////////////////////////////////////////////////////////////////////////////
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
    
    btnNextQuestion()

    // The function to incremment the count variable to use on the logic to go two next questio
    increementCount()
  
    localStorage.setItem('totalCorrect', correctAnswersCount);
  }
 }

const btnNextQuestion = () =>{
  if(getCount() < 9){
   
    submitAnswer.style = 'display:none;'
    nextAnswer.style = 'display:flex;'
    nextAnswer.addEventListener('click', () => {
    const removeSvg = document.querySelector('#removeSvg');
    if (elementSelected) {
      if (elementSelected.parentNode) {
        elementSelected.parentNode.style.border = ''; // Reset border
        elementSelected.parentNode.style.justifyContent = 'flex-start'; // Reset justify content
        if (elementSelected.previousElementSibling) {
          elementSelected.previousElementSibling.style.backgroundColor = ''; // Reset background
          elementSelected.previousElementSibling.style.color = '#626C7F'; // Reset color
        }
      }
    }
    if(removeSvg){
      removeSvg.remove();
    }
    questionNumber.innerHTML = `${getCount() + 1}`;
    quizzes()
    range()
    submitAnswer.style = 'display:flex;'
    nextAnswer.style = 'display:none;'
  });
  }else{
    submitAnswer.style = 'display:none;'
    nextAnswer.style = 'display:none;'
    const button = document.createElement('button');
    button.setAttribute('class','btn');
    button.setAttribute('id', 'checkScore');
    button.innerHTML = 'Score';
    multChoice.appendChild(button);
    const btnScore = document.querySelector('#checkScore');
    btnScore.addEventListener('click', () =>{
      window.location.replace("quizCompleted.html")
    })
  }
 
}

function getCount() {
  return count;
}

const quizCompleted = () =>{

  let totalCorrect;
  let selectedSubject = localStorage.getItem('selectedSubject');
  
  // Reset the title display and icon
  titleDisplayQuizCompleted.innerHTML = '';
  iconQuizCompleted.innerHTML = '';
  totalCorrect = '';
  for(items of Object.entries(data)){
    for(let i = 0; i < 4; i++){
      if(items[1][i].title === selectedSubject){

        const imgTitle = document.createElement('img');
        imgTitle.src = `${items[1][i].icon}`;
        imgTitle.style = 'width:40px; heigth:40px;';
        titleDisplayQuizCompleted.prepend(imgTitle);

        const divTitle = document.createElement('div');
        divTitle.setAttribute('class', 'subjectTitle');
        divTitle.innerHTML = items[1][i].title;
        titleDisplayQuizCompleted.appendChild(divTitle);
   
        const img = document.createElement('img');
        img.src = `${items[1][i].icon}`;
        img.style = 'width:40px; heigth:40px;';
        iconQuizCompleted.prepend(img);

        const div = document.createElement('div');
        div.setAttribute('class', 'subjectTitle');
        div.innerHTML = items[1][i].title;
        iconQuizCompleted.appendChild(div)
      }
    }
  }

  totalCorrect = localStorage.getItem('totalCorrect');
  totalScore.innerHTML = totalCorrect;

  playAgain()
}

const playAgain = () =>{
  playAgainBtn.addEventListener('click',() => {
    window.location.replace("index.html")      
  });
};