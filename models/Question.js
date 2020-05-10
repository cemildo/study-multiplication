class Question{
  constructor(){
     this.date = new Date("Fri May 08 2020").toDateString();
     this.firstNumber = this.random();
     this.secondNumber = this.random();
  }

  random(min = 2, max = 7){
    return Math.floor(Math.random() * max) + min;
  }

  setAnswer(answer){
    this.answer = answer;
    this.expected = this.firstNumber * this.secondNumber;
    this.score = this.expected == answer;
  }

  toString(){
    return {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      date: this.date,
      answer: this.answer,
      score: this.score,
      expected: this.expected
    }
  }
}
