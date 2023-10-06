import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

export const pinia = createPinia();

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        //const data = await response.json();

        if (response.ok) {
          this.isAuthenticated = true;
          // Handle successful login (e.g., store token, redirect, etc.)
        } else {
          // Handle failed login (e.g., show error message)
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error('Error occurred:', error);
      }
    },
    logout() {
      this.isAuthenticated = false;
      // Handle logout logic if necessary
    }
  }
});
