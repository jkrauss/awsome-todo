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
  },
  search: ''
  //TODO: insert and use showAddTaskModal instead of the quasar global event bus
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
  },
  setSearch(state, value){
    state.search = value
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
  },
  setSearch({commit}, value){
    commit("setSearch", value)
  }
};

const getters = {
  tasksFiltered: state => {
    let tasksFiltered = {}
    if (state.search){
      Object.keys(state.tasks).forEach(function(key){
        let task = state.tasks[key],
            taskNameLowercase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase()
        if(taskNameLowercase.includes(searchLowerCase)){
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.tasks
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
     Object.keys(tasksFiltered).forEach(function(key){
       let task = tasksFiltered[key]
       if (!task.completed){
         tasks[key] = task
       }       
     })
    
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
     Object.keys(tasksFiltered).forEach(function(key){
       let task = tasksFiltered[key]
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
