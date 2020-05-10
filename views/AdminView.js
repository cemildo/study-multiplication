class AdminView{
  constructor(manager){
    this.manager = manager;
    this.students = [];
    this.page = document.querySelector('.admin-container');
    this.chart = new ProgressChart(this.manager);
  }

  init(){
    this.page.querySelector('.item1').innerHTML = `Hosgeldin
         ${this.manager.currentUser.settings.userName} Admin.`;
    this.chart.init();
    this.setListeners();
  }

  setListeners(){
    document.querySelector('.admin-container .logout')
            .addEventListener('click', this.doLogout.bind(this));
  }

  doLogout(){
    this.manager.auth.doLogout();
    this.manager.views.login.loggedInUser = null;
    this.manager.showCurrentView(this.manager.views.login)
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

  addStudent(name){
    this.students.push(new Person(name))
  }
}
