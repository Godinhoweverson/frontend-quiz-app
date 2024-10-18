const pickSubjectBtn = document.querySelectorAll('.pick a');
const titleDisplay = document.querySelector('.question-type p');
const iconSubject = document.querySelector('.question-type');
const questionsHeanding = document.querySelector('.questions h1');
const btnOptionsParagraph = document.querySelectorAll('.answers p');
const btnOptions = document.querySelectorAll('.answers');

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
        displayQuestions(items[1][i].questions)
      }
    }
  }
}

const displayQuestions = (questions) => {
  questionsHeanding.innerHTML = questions[0].question
  for(let i = 0; i < btnOptions.length; i++){
    btnOptionsParagraph[i].innerHTML = questions[0].options[i]
  }
}

btnOptions.forEach(element => {
  element.addEventListener('click', (btn) =>{
    console.log(btn)
  })
});

// Get the options button and add a eventListener 

// and print the value
