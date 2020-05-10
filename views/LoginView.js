class LoginView{
  constructor(manager){
    this.manager = manager;
    this.loginContainer = '.login-form .password';
    this.page = document.querySelector('.login-form');
    this.addLoginEventListener();
    this.loggedInUser = null;
  }

  checkIfUserLoggedIn(){
    const user = this.manager.auth.getAuthenticatedUser();
    if(user){
      this.loggedInUser = user;
      this.login();
    }
  }

  getPassword(){
    const password = document.querySelector(this.loginContainer).value;

    if(!password){
      this.addToDom('.message', 'Lütfen gecerli bir password giriniz');
      return;
    }

    return password;
  }

  addLoginEventListener(){
    document.querySelector('.login-button')
            .addEventListener('click', this.login.bind(this));
  }

  show(){
    this.page.style.display = 'block';
  }

  hide(){
    this.page.style.display = 'none';
  }

  login(){
    if(!this.loggedInUser){
      const password = this.getPassword();
      this.loggedInUser = this.manager.auth.doLogin(password);

      if(!this.loggedInUser) {
        this.addToDom('.message', 'Lütfen gecerli bir password giriniz!');
        return;
      }
    }

    this.manager.setCurrentUser(this.loggedInUser);

    (this.loggedInUser.settings.type === 'student')
      ? this.manager.showCurrentView(this.manager.views.student)
      : this.manager.showCurrentView(this.manager.views.admin);
  }

  addToDom(place, value){
    document.querySelector(place).innerHTML = value;
  }
}
