import Vue from "vue";

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
  }
};

const actions = {
  //actions can be asynchronous, can't modify state directly
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  }
};

const getters = {
  tasks: state => {
    return state.tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
