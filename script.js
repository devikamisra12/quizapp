// backgroung-change
let randomBackground = document.querySelector(".background-change");
const nextBtn_DOM = document.querySelector(".btn");

nextBtn_DOM.addEventListener("click", changeBackground);
let images = [
  "./media/ambedkar.jpg",
  "./media/bhagat-780x405.jpg",
  "./media/east_india_company.jpg",
  "./media/Gandhi.jpg",
  "./media/History-of-Indias-Independence-ili-586-img-5.jpg",
  "./media/images (1).jpeg",
  "./media/images.jpeg",
  "./media/lastmugal.jpg",
  "./media/Mutiny2.jpg",
  "./media/Pandit-Jawaharlal-Nehru.jpg",
  "./media/plassey.jpg",
  "./media/SepoyMutiny_02.jpg",
  "./media/signing-of-the-Constitution.jpg",
  "./media/thediplomat-indian_kathakar_storyteller_1913.jpg",
];

function changeBackground() {
  let imageIndex = Math.floor(Math.random() * images.length);
  randomBackground.style.background = `radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.61) 6%,rgba(0,0,0,0.49) 25%,rgba(0,0,0,0) 100%),url(${images[imageIndex]})`;
  randomBackground.style.backgroundRepeat = "no-repeat";
  randomBackground.style.backgroundPosition = "centre";
  randomBackground.style.backgroundSize = "cover";
  // randomBackground.style.transition = "all 50s linear";
}
// setInterval(changeBackground , 6000);

// quiz structure

class Question {
  constructor(title, options, correctAnswerIndex) {
    this.title = title;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }
  isCorrect(userAnswer) {
    return this.correctAnswerIndex === userAnswer;
  }
  createQuestionUi() {
    return `
    <h2>${this.title}</h2>
        <form action="#">
            ${this.options
              .map((option, index) => {
                return `
                        <div class="option-group">
                            <input type="radio" class="form" value=${index} id="option-${index}" name="option">
                            <label for="option-${index}">${option}</label>
                            
                        </div>
                    `;
              })
              .join("")}
              
        </form>
        `;
  }
}

const question1 = new Question(
  "Who was the governor-general during the Revolt of 1857?",
  ["Lord Canning", "Lord Irwin", "Lord Lytton", "Lord Willington"],
  0
);
const question2 = new Question(
  "The Battle of Buxar was fought between British East India Company and:",
  ["Mir Qasim", "Saadat Ali Khan II", "Ali Vardi Khan", "Siraj ud-Daulah"],
  0
);
const question3 = new Question(
  "Sir Huge Rose described whom as ‘the best and bravest military leader of the rebel’?",
  [
    " Begum Hazrat Mahal",
    " Rani Laxmi Bai",
    "Kuar Singh",
    "Bahadur Shah Zafar",
  ],
  1
);
const question4 = new Question(
  "On which among the following dates, Jallianwala Bagh Massacre took place ?",
  ["April 16,1919", "April 13,1919", "April 3,1919", "April 14,1919"],
  1
);
const question5 = new Question(
  "Who among the following was the first Indian woman president to chair the Indian National Congress at Kanpur session of 1925?",
  ["Annie Beasant", "Nellie Sengupta", "Indira Gandhi", "Sarojini Naidu"],
  3
);
const question6 = new Question(
  "Who has initiated the slogan ” Inqlab Zindabad”?",
  ["Bhagat Singh", "Chandra shekahar Azad", "Hasrat Mohani", "Iqbal"],
  2
);
const question7 = new Question(
  "Which among the following cities saw the first instance of Satyagraha in India?",
  [" Surat", "Kheda", "Champaran", " Ahmedabad"],
  3
);
const question8 = new Question(
  "The English established their first factory at:",
  [" Surat", "Bombay", "Madras", " Ahmedabad"],
  0
);
const question9 = new Question(
  "Who founded the Home Rule League in Calcutta in 1916 A.D?",
  ["Bipin Chandra Pal", "lokmanya Tilak", "Annie Besant", "Arvind Ghosh"],
  2
);
const question10 = new Question(
  "Muslim League was founded in the year:",
  ["1900", "1901", "1908", "1906"],
  3
);

const formHolder_DOM = document.querySelector(".form-holder");


class Quiz {
  constructor(root, allQuestions) {
    this.allQuestions = allQuestions;
    this.score = 0;
    this.activeIndex = 0;
    this.handlerFunction();

    // DOM
    this.root = root;
  }

  createQuizUI() {
    this.root.innerHTML = this.allQuestions[
      this.activeIndex
    ].createQuestionUi();
  }

  updateScore() {
    this.score++;
  }

  nextQuestion() {
    if (this.activeIndex < this.allQuestions.length - 1) {
      this.activeIndex++;
      this.createQuizUI();
    } else {
      formHolder_DOM.style.display = "none";
      nextBtn_DOM.style.display = "none"
      document.querySelector(".score-count").style.display = "block";
      // document.querySelector(".score-count").style.display = "block";
      document.querySelector(".score-count").innerHTML = `Your Score: ${this.score}`;
    }
  }

  handlerFunction() {
    window.addEventListener("load", () => {
      this.createQuizUI();
      document.querySelector(".score-count").style.display = "none";
    });
    document.querySelector(".btn").addEventListener("click", () => {
      const userAnswer = document.querySelector("input[name=option]:checked")
        .value;
      const currentQuestion = this.allQuestions[this.activeIndex];
      const isCorrect = currentQuestion.isCorrect(+userAnswer);
      if (isCorrect) {
        this.updateScore();
      }
      this.nextQuestion();
    });
  }
}

const quiz = new Quiz(formHolder_DOM, [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
]);
quiz.createQuizUI();

// window.onload = function () {
//   document.onkeydown = function (e) {
//   return (e.which || e.keyCode) != 116;
//   } 
// }