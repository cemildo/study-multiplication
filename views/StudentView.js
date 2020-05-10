class StudentView{
  constructor(manager){
    this.manager = manager;
    this.page = document.querySelector('.student-container');
    this.title = this.page.querySelector('.item1');
    this.score = new ScoreView(this.manager);
    this.scoreList = new ScoreListView(this.manager);
  }

  init(){
    this.title.innerHTML = `Hosgeldin
         ${this.manager.currentUser.settings.userName} Ogrenci.`;
    this.setNumbers();
    this.setListeners();
  }

  setListeners(){
    document.querySelector('.student-container .logout')
            .addEventListener('click', this.doLogout.bind(this));

    document.querySelector('.student-container .answer-button')
            .addEventListener('click', this.doNext.bind(this));
    document.querySelector('.student-container .answer')
            .addEventListener('keypress', function(e) {
              const key = e.which || e.keycode || 0;
              if(key === 13){
                this.doNext();
              }
            }.bind(this));
  }

  doLogout(){
    this.manager.auth.doLogout();
    this.manager.views.login.loggedInUser = null;
    this.manager.showCurrentView(this.manager.views.login)
  }

  doNext(){
    const answerContainer = document.querySelector('.student-container .answer');
    if(!!answerContainer.value){
      this.question.setAnswer(answerContainer.value);
      this.title.innerHTML = `
        ${this.question.score ?  'DOGRU': 'YANLIS'}
        (${this.question.firstNumber} X ${this.question.secondNumber} =
        ${this.question.expected} senin cevabin ${this.question.answer})
      `;

      this.question.score
          ? this.title.style.color = 'green'
          : this.title.style.color = 'red';

      this.manager.currentUser.works.push(this.question);

      answerContainer.value = '';
      this.setNumbers();
      this.score.update();
      this.scoreList.update();
      this.saveScore();
    } else {
      this.title.style.color = 'black';
      this.title.innerHTML = "Lutfen bir cevap yaz!"
    }
  }

  saveScore(){
    const answers = this.manager.currentUser.works;
    const database = this.manager.db.getItem(this.manager.appName);
    database.users.map(user => {
      if(user.settings.password === this.manager.currentUser.settings.password){
        user.works = answers;
      }
    });
    this.manager.db.setItem(this.manager.appName, database);
  }

  setNumbers(){
    this.question = new Question();
    this.addToDom('.student-container #firstNumber', this.question.firstNumber);
    this.addToDom('.student-container #secondNumber', this.question.secondNumber);
  }

  show(){
    this.init();
    this.page.style.display = 'block';
  }

  hide(){
    this.page.style.display = 'none';
  }

  addToDom(place, value){
    document.querySelector(place).innerHTML = value;
  }
}
