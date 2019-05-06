
class Model {
  constructor() {
    this.loggedIn = false;
    this.userName = null;
    this.forumName = null
    this.forumId = null;
    this.topicName = null;
    this.topicId = 0;
    this.observers = []
    this.createTopic = false;
    this.createPost = false;
    this.editPost = false;
  }
  setLogin(logged, username) {
    this.loggedIn = logged;
    this.userName = username
    this.notifyObservers(0);
  }
  
  setTopic(id, name) {
    this.topicId = id;
    this.topicName = name;
    this.notifyObservers(2)
  }
  setForum(id, name) {
    this.forumId = id;
    this.forumName = name;
    this.notifyObservers(1)
  }
  getCreateTopic() {
    return this.createTopic;
  }
  setCreateTopic(val) {
    this.createTopic = val;
    this.notifyObservers(3);
  }
  getCreatePost() {
    return this.createPost;
  }
  setCreatePost(val) {
    this.createPost= val;
    this.notifyObservers(4);
  }
  
  getEditPost() {
    return this.editPost;
  }
  setEditPost(val) {
    this.editPost = val
    this.notifyObservers(5);
  }
  
  getForum() {
    return {forumId: this.forumId, forumName: this.forumName}
  }
  
  getTopic() {
    return {topicId: this.topicId, topicName: this.topicName}
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