import api from "@/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {

    state: () => ({
        token: null,
        email: null,
        isAdmin: null
    }),

    getters: {
        isUserLoggedIn: (state) => state.token,
        isUserAdmin: (state) => state.isAdmin
    },

    actions: {

        async register(email, password) {
            let response = await api.post('/users/register', {
                email: email,
                password: password
            })
            return response.data.message;
        },

        async login(email, password) {
            let response = await api.post('/users/login', {
                email: email,
                password: password
            })

            if (response.data.access) {
              localStorage.setItem("token", response.data.access);
              this.token = response.data.access;

              return "Logged in successfully";
            }
        },

        async getUserDetails() {
            let response = await api.get('/users/details');

            if (response.data.user) {
                this.email = response.data.user.email;
                this.isAdmin = response.data.user.isAdmin;
            }
        },

        logout() {
            localStorage.clear();
            this.token = null;
            this.email = null;
            this.isAdmin = null;
        }

    },
})