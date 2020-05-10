class ScoreListView{
  constructor(manager){
    this.manager = manager;
    this.page = document.querySelector('.student-container .score-list');
    this.update()
  }

  update(){
    if(this.manager.currentUser){
      const answers = this.manager.currentUser.works;
      const convertedAnswers = answers.map(item => {
          return `<li class="${item.score ? 'correct' : 'wrong'}">
                <div>${item.firstNumber}</div>
                <div> x </div>
                <div>${item.secondNumber}</div>
                <div>=</div>
                <div> ${item.answer}</div>
              </li>`
          }).join('');
      this.page.innerHTML = convertedAnswers;
    }
  }

  show(){
    this.init();
    this.page.style.display = 'block';
  }

  hide(){
    this.page.style.display = 'none';
  }
}
