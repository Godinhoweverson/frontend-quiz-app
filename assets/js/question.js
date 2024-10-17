import btnValue from "/assets/js/script.js"

// SLIDER
const slider = document.getElementById('range');

  const tempSliderValue = 3;
  const max = slider.max; 
  const progress = (tempSliderValue / max) * 100; 

  slider.style.background = `linear-gradient(to right, #A729F5 ${progress}%, #fff ${progress}%)`;


  let data;
  fetch('./data.json')
  .then((res) => res.json())
  .then((json) => {
    data = json;
    quizzes()
  })
  .catch((error) => console.error('Error fetching data:', error));  

// How to acess the values on JSOn
const quizzes = () =>{
  for(items of Object.entries(data)){
    console.log(items[1][0])
  }
}

console.log(btnValue())