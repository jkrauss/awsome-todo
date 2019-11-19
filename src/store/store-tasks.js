import Vue from "vue";
import { uid, Notify } from "quasar";
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  tasks: {
    // ID1: {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: "2019-10-05",
    //   dueTime: "15:30"
    // },
    // ID2: {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: "2019-11-02",
    //   dueTime: "17:30"
    // },
    // ID3: {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: "2019-11-04",
    //   dueTime: "13:00"
    // }
  },
  search: "",
  sort: "name",
  tasksDownloaded: false
  //TODO: insert and use showAddTaskModal instead of the quasar global event bus
};

const mutations = {
  // mutations are instant changes to the store
  updateTask(state, payload) {
    //Object.assign(state.tasks[payload.id], payload.updates);
    state.tasks[payload.id] = payload.updates
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  clearTasks(state){
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};

const actions = {
  //actions can be asynchronous, can't modify state directly
  updateTask({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    dispatch("fbAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },

  fbReadData({commit}){
    let uid = firebaseAuth.currentUser.uid;
    let userTasks = firebaseDb.ref('tasks/'+uid); 

    //initial check for data
    userTasks.once("value", snapshot=>{
      commit("setTasksDownloaded", true)
    }, error=>{
      showErrorMessage(error.message)
      this.$router.replace('/auth')
    });

    //child added
    userTasks.on("child_added", snapshot =>{
      let payload = {
        id: snapshot.key,
        task : snapshot.val()
        }
        commit("addTask", payload)
    });

    //child changed
    userTasks.on("child_changed", snapshot =>{
      let payload = {
        id: snapshot.key,
        updates : snapshot.val()
        }
        commit("updateTask", payload)
    });

    //child deleted
    userTasks.on("child_removed", snapshot =>{
        commit("deleteTask", snapshot.key)
    });
  },
  fbAddTask({}, payload){
    let uid = firebaseAuth.currentUser.uid;
    let fbTask = firebaseDb.ref('tasks/'+uid+"/"+payload.id);
    fbTask.set(payload.task, error=>{
      if (error) {
        showErrorMessage("error.message")
      }
      else {
        Notify.create("Added '"+payload.task.name+"'") 
      }
    })
  },
  fbUpdateTask({}, payload){
    let uid = firebaseAuth.currentUser.uid;
    let fbTask = firebaseDb.ref('tasks/'+uid+"/"+payload.id);
    fbTask.update(payload.updates, error=>{
      if (error) {
        showErrorMessage(error.message)
      }
      else {
        console.log(payload.updates)
        let keys = Object.keys(payload.updates)
        console.log(keys)
        if(!(keys.includes('completed') && keys.length==1)) {
          Notify.create("Updated task") 
        }
      }
    })
  },
  fbDeleteTask({}, id){
    let uid = firebaseAuth.currentUser.uid;
    let fbTask = firebaseDb.ref('tasks/'+uid+"/"+id);
    fbTask.remove(error=>{
      if (error) {
        showErrorMessage(error.message)
      }
      else {
        Notify.create("Deleted task") 
      }
    })
  }
};

const getters = {
  //TODO: There's errors when sort is set to dueDate but there are tasks without a dueDate
  tasksSorted: state => {
    let tasksSorted = {};
    let keysSorted = Object.keys(state.tasks); //.forEach(function (key) {})
    keysSorted.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp < taskBProp) {
        return -1;
      } else if (taskAProp > taskBProp) {
        return 1;
      } else return 0;
    });
    keysSorted.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    //console.log(tasksSorted);
    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key],
          taskNameLowercase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowercase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });

    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
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
