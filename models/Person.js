class Person{
  constructor(name){
    this.name = name;
    this.tests = [];
  }

  addQuiz(quiz){
    this.tests.push(quiz);
  }

  printResults(){
    this.tests.quizes.forEach(question => {
      console.log(this.name, question.date, question.firstNumber,
                question.secondNumber, question.answer, question.expected,
                question.score);
    })
  }
}
