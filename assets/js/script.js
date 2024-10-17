const pickSubjectBtn = document.querySelectorAll('.pick a');
const title = document.querySelector('.question-type p')
const iconSubject = document.querySelector('.question-type')

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
      let storageRemove = true
      localStorageRemove(storageRemove)
    })
  })
}
btnValue()

// Get the Subject selected from localStorage
const selectedSubject = localStorage.getItem('selectedSubject');

const localStorageRemove = (){
  if(selectedSubject){
    if(slider){
    localStorage.removeItem('selectedSubject');
    }
  }
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
        title.innerHTML = items[1][i].title
        const img = document.createElement('img')
        img.src = `${items[1][i].icon}`
        img.style = 'width:56px; heigth:56px;'
        iconSubject.prepend(img)
      }
    }
  }
}



// Create a loop to iterate on 4 properties and check if is true or false
// if is true print the title, icon, and question


// get the class from Html for Icon , and title and display on the page

