
class Model {
  constructor() {
    this.loggedIn = false;
    this.userName = null;
    this.observers = []
  }
  

  setLogin(logged, username) {
    this.loggedIn = logged;
    this.userName = username
    this.notifyObservers(0);
  }
  
  isLoggedIn() {
    return this.loggedIn
  }
  
  getUserName() {
    return this.userName
  }
  setUserName(name) {
    this.userName = name;
  }

  addObserver(observer) {
    this.observers.push(observer);
  };

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  };

  notifyObservers(code) {
    this.observers.forEach(o => o.update(code));
  };
};

export const modelInstance = new Model();