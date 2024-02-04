document.addEventListener("DOMContentLoaded", function() {//im not really sure what DOMContentLoaded is
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "New York", correct: false },
        { text: "London", correct: false },
        { text: "Paris", correct: true },
        { text: "Dublin", correct: false },
      ],
    },
    {
      question: "Who is CEO of Tesla?",
      answers: [
        { text: "Jeff Bezos", correct: false },
        { text: "Elon Musk", correct: true },
        { text: "Bill Gates", correct: false },
        { text: "Tony Stark", correct: false },
      ],
    },
    {
      question: "The iPhone was created by which company?",
      answers: [
        { text: "Apple", correct: true },
        { text: "Intel", correct: false },
        { text: "Amazon", correct: false },
        { text: "Microsoft", correct: false },
      ],
    },
    {
      question: "How many Harry Potter books are there?",
      answers: [
        { text: "1", correct: false },
        { text: "4", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
      ],
    },
    {
      question: "What is 2 + 2?",
      answers: [
        { text: "4", correct: true },
        { text: "21", correct: false },
        { text: "22", correct: false },
        { text: "0", correct: false },
      ],
    },
  ];
  const questionContainer = document.getElementById("question");
  const answerBtn = document.getElementById("ansGroup");
  const nextBtn = document.getElementById("strtBtn"); 
  const prevBtn = document.getElementById("prevBtn");

  let currentIndex = 0;
  let score = 0;

  function startQuiz(){
    answerBtn.classList.remove("hidden");
    prevBtn.classList.remove("hidden");

    currentIndex = 0;
    score = 0;
    //score = questions.length;
    nextBtn.innerHTML = "Next";

    showQuestions();

    nextBtn.removeEventListener("click", startQuiz);
    nextBtn.addEventListener("click", showNextQuestion);
  }

  function showQuestions(){
    resetState(); // delete the previous question and answers
    let currentQuestion = questions[currentIndex];
    let questionNum = currentIndex + 1;
    questionContainer.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("ansBtn");
      answerBtn.appendChild(button);
      if (answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer); //JUST CHANGED THIS LINE
    });
  }

  function showPrevQuestion(){
    if (currentIndex > 0){
      currentIndex--;
      score--;
      if(score > questions.length){
        score = questions.length;
      }
      else if(score < 0)
      {
        score = 0;
      } 
      showQuestions();
    }
  }

  function resetState(){
    nextBtn.style.display = "none";
    while (answerBtn.firstChild){
      answerBtn.removeChild(answerBtn.firstChild);
    }
  }

  function selectAnswer(evt) {
    const selectedBtn = evt.target;
    const isCorrect = selectedBtn.dataset.correct
    if (isCorrect == "true"){
      score++;
      selectedBtn.classList.add("correct");
    }
    else{
      selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
      if (button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextBtn.style.display = "block";
    nextBtn.style.float = "right";
  }

  function showNextQuestion(){
    currentIndex++;
    if (currentIndex < questions.length){
      showQuestions();
    }
    else{
      questionContainer.innerHTML = "You got " + score + " out of " + questions.length + " questions correct!";
      answerBtn.classList.add("hidden");
      prevBtn.classList.add("hidden");
      nextBtn.innerHTML = "Restart";
      nextBtn.removeEventListener("click", showNextQuestion);
      nextBtn.addEventListener("click", startQuiz);
    }
  }

  /*const startBtn = document.getElementById("strtBtn");
  startBtn.addEventListener("click", ()=>{
      if(currentIndex < questions.length ){
        showNextQuestion();
      } // Add this closing curly brace
      else{
        startBtn.addEventListener("click", startQuiz);
      }
  });*/
  nextBtn.addEventListener("click", startQuiz);
  prevBtn.addEventListener("click", showPrevQuestion);
});