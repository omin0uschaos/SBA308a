const screenFrame = document.querySelector("main");

export function randomFlicker() {
  // Add the flicker class
  screenFrame.classList.add('flicker');
  var flickerAudio = new Audio('./audio/eflicker.mp3');
  flickerAudio.play();

  // Remove the flicker class after a short delay
  setTimeout(() => {
    screenFrame.classList.remove('flicker');
    flickerAudio.pause();
    flickerAudio.currentTime = 0
  }, 100); 

  // Wait for a random time before flickering again
  const nextFlicker = Math.random() * 8000;
  setTimeout(randomFlicker, nextFlicker);

  
}
                

