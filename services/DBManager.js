class DBManager{
  constructor(appName){
    this.db = localStorage;
    this.appName = appName;
    this.setInitialData();
  }

  setInitialData(){
    const data = this.getItem(this.appName);
    if(!data){
      const initialData = {
        users: [
          {
            settings: {
              userName: 'Admin',
              isLoggedIn: false,
              type: 'admin',
              password: 'secret',
              date : new Date().toDateString()
            },
            works: []
          },
          {
            settings: {
              userName: 'ayse',
              isLoggedIn: false,
              type: 'student',
              password: 'ayse',
              date : new Date().toDateString()
            },
            works: []
          },
          {
            settings: {
              userName: 'hasan',
              isLoggedIn: false,
              type: 'student',
              password: '1234',
              date : new Date().toDateString()
            },
            works: []
          }
        ]
      };

      this.setItem(this.appName, initialData);
    }
  }

  setItem(key, value){
    value = JSON.stringify(value);
    this.db.setItem(key, value);
  }

  getItem(key){
    const data = this.db.getItem(key);
    return JSON.parse(data);
  }
}
