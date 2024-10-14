const slider = document.getElementById('range');

  const tempSliderValue = 3;
  const max = slider.max; 
  const progress = (tempSliderValue / max) * 100; 

  slider.style.background = `linear-gradient(to right, #A729F5 ${progress}%, #fff ${progress}%)`;
