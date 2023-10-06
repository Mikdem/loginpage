<template>
  <form @submit.prevent="loginUser" class="flex flex-col items-center max-w-[420px] mx-auto bg-white text-left px-12 py-16 rounded-lg shadow-lg">
    <h2 class="text-3xl text-darkCyan font-bold self-start">Login</h2>
    <p class="text-base self-start my-2">Please login to your account</p>
    <label class="text-darkGrayishCyan text-xs self-start font-semibold mt-[25px] mb-3 uppercase tracking-wide">Email:</label>
    <input type="email" required v-model="email" class="p-2 block w-full border-b border-gray-300 focus:outline-none mb-[10px] rounded-lg focus:border-veryDarkGrayishCyan">

    <label class="text-darkGrayishCyan text-xs self-start font-semibold mt-[25px] mb-3 uppercase tracking-wide">Password:</label>
    <input type="password" required v-model="password" class="p-2 block w-full border-b border-gray-300 rounded-lg focus:outline-none focus:border-veryDarkGrayishCyan">
    <button type="submit" class="mt-[50px] mb-[30px] text-white bg-darkCyan py-[10px] w-full p-2 mb-6 bg-5BA4A4 text-white border border-5BA4A4 rounded-lg hover:bg-63BABA transition duration-300 ease-in-out">Login</button>
   <!-- <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>-->
    <error-modal :is-visible="isErrorModalVisible" :error-message="errorMessage" @close="closeErrorModal"></error-modal>
  </form>
</template>

<script>
import { authStore } from '@/store/auth';
import ErrorModal from '@/components/ErrorModal.vue';

export default {
  components: {
    ErrorModal
  },
  data() {
    return {
      email: '',
      password: '',
      isErrorModalVisible: false,
      errorMessage: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const store = authStore(); 
        await store.login(this.email, this.password);
      if (store.isAuthenticated) {
          this.$router.push({ name: 'JobsList' });
          console.log('Login successful');
        } else  {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isErrorModalVisible = true;
          console.error('Error occurred:', this.errorMessage);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        this.errorMessage = 'An error occurred while processing your request.';
        this.isErrorModalVisible = true;
      }
    },
    closeErrorModal() {
      this.isErrorModalVisible = false;
    }
  }
};
</script>

<style>
    body{
        background-color: #EFFAFA;
    }
 </style>
