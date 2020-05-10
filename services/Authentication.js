class Authentication{

  constructor(dbManager){
    this.dbManager = dbManager;
  }

  getAuthenticatedUser(){
    const data = this.dbManager.getItem(this.dbManager.appName) || [];
    return data.users.find(user => user.settings.isLoggedIn == true);
  }

  doLogin(password){
    const data = this.dbManager.getItem(this.dbManager.appName) || [];
    const user = data.users.find(a => a.settings.password === password);

    if(user) {
      data.users.map(pUser => {
        if(pUser.settings.userName === user.settings.userName){
          pUser.settings.isLoggedIn = true;
        }
        return pUser;
      });
      this.dbManager.setItem(this.dbManager.appName, data);
      return user;
    }
    return false;
  }

  doLogout(){
    const data = this.dbManager.getItem(this.dbManager.appName) || [];
    data.users.map(user => {
      user.settings.isLoggedIn = false;
      return user;
    });
    this.dbManager.setItem(this.dbManager.appName, data);
  }
}

