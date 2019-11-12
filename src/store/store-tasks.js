import Vue from "vue";
import { uid } from 'quasar';

const state = {
  tasks: {
    ID1: {
      name: "Go to shop",
      completed: false,
      dueDate: "2019-10-05",
      dueTime: "15:30"
    },
    ID2: {
      name: "Get bananas",
      completed: false,
      dueDate: "2019-11-02",
      dueTime: "17:30"
    },
    ID3: {
      name: "Get apples",
      completed: false,
      dueDate: "2019-11-04",
      dueTime: "13:00"
    }
  }
};

const mutations = {
  // mutations are instant changes to the store
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload){
    Vue.set(state.tasks, payload.id, payload.task)
  }

};

const actions = {
  //actions can be asynchronous, can't modify state directly
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task){
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    }

    commit("addTask", payload);
  }
};

const getters = {
  tasksTodo: state => {
    let tasks = {}
    
     Object.keys(state.tasks).forEach(function(key){
       let task = state.tasks[key]
       if (!task.completed){
         tasks[key] = task
       }       
     })
    
    return tasks;
  },
  tasksCompleted: state => {
    let tasks = {}
    
     Object.keys(state.tasks).forEach(function(key){
       let task = state.tasks[key]
       if (task.completed){
         tasks[key] = task
       }       
     }) 
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
