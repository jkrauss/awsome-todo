import { firebaseAuth } from "boot/firebase";
import { LocalStorage } from "quasar";

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, val) {
    state.loggedIn = val;
  }
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log("response: ", response);
      })
      .catch(error => {
        console.log("error.message: ", error.message);
      });
  },
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log("response: ", response);
      })
      .catch(error => {
        console.log("error.message: ", error.message);
      });
  },
  logoutUser({}) {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch(err => {});
      } else {
        //User is logged out.
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch(err => {});
      }
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
