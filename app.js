class Manager{

  constructor(){
     this.appName = 'kerrat';
     this.setViews();
     this.db = new DBManager(this.appName);
     this.auth = new Authentication(this.db);
     this.showCurrentView(this.views.login);
     this.views.login.checkIfUserLoggedIn();
  }

  setViews(){
    this.views = {
      login: new LoginView(this),
      admin: new AdminView(this),
      student: new StudentView(this)
     };
  }

  setCurrentUser(user){
    this.currentUser = user;
  }

  showCurrentView(view) {
      Object.values(this.views).forEach(a => a.hide());
      view.show();
  }
}

const manager = new Manager();
