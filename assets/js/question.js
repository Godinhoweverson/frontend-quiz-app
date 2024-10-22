// import btnValue from "/assets/js/script.js"

// // SLIDER
// const slider = document.getElementById('range');

//   const tempSliderValue = 3;
//   const max = slider.max; 
//   const progress = (tempSliderValue / max) * 100; 

//   slider.style.background = `linear-gradient(to right, #A729F5 ${progress}%, #fff ${progress}%)`;


//   let data;
//   fetch('./data.json')
//   .then((res) => res.json())
//   .then((json) => {
//     data = json;
//     quizzes()
//   })
//   .catch((error) => console.error('Error fetching data:', error));  

// // How to acess the values on JSOn
// const quizzes = () =>{
//   for(items of Object.entries(data)){
//     console.log(items[1][0])
//   }
// }

// console.log(btnValue())


// Get value from Answer selected
const getValueBtnOptions = (answer) => {
  let selectedElement = null;
  let selectedAnswer = '';

  answer.forEach(el => {
    el.addEventListener('click', () => {
      // RESET ALL VALUES
      answer.forEach((btn) => {
        btn.parentNode.style = '';
        btn.previousElementSibling.style.backgroundColor = '';
        btn.previousElementSibling.style.color = '';
      });

      // Store selected element and answer
      selectedElement = el;
      selectedAnswer = el.textContent;

      // Highlight selected button
      el.parentNode.style = 'border: 2px solid #A729F5;';
      el.previousElementSibling.style.backgroundColor = '#A729F5';
      el.previousElementSibling.style.color = '#fff';

      // Call submitAnswerBtn
      submitAnswerBtn(selectedElement, selectedAnswer);
    });
  });

  // Function to call submitAnswerBtn outside of the event listener
  const callSubmitAnswerBtn = () => {
    if (selectedElement && selectedAnswer) {
      submitAnswerBtn(selectedElement, selectedAnswer);
    }
  };
};