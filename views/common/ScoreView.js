class ScoreView{
  constructor(manager){
    this.manager = manager;
    this.page = document.querySelector('.student-container .score');
    this.update()
  }

  update(){
    if(this.manager.currentUser){
      const answers = this.manager.currentUser.works;
      const correctAnswers = answers.filter(item => item.score);
      if(correctAnswers && correctAnswers.length > 0){
        const point = correctAnswers.length * 10;
        this.page.innerHTML = point;
      }
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
