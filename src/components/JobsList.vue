<template>
        <header class="relative  bg-darkCyan mt-[-60px]">
      <img class="w-full" src="../assets/bg-header-desktop.svg" alt="Header Image">
  </header> 
<section>
        <main class="bg-[#effafa] w-full px-1">
            <div>
              <div id="filterContainer"
                class="hidden mx-auto max-w-5xl bg-white py-4 px-6 relative -top-8 rounded-lg shadow-xl shadow-cyan-dark/10 justify-between items-center">
                <div id="tabletContainer" class="search__content flex flex-wrap gap-2">
                  <span> </span>
                </div>
                <button id="clearButton" class="font-bold text-darkCyan justify-items-end cursor-pointer hover:underline">Clear</button>
              </div>
              <div class="flex text-right">
                <button @click="handleLogout">Logout</button>
              </div>
            </div>
            

            <!-- Flex Container -->
            <div  class="flex flex-col space-y-12 md:space-y-6 container mx-auto max-w-5xl py-24" id="jobs">
                <div v-for="job in jobsOnly" :key="job._id" class="flex bord flex-col md:flex-row justify-between items-start md:items-center bg-white px-4 pb-8 md:p-8 rounded-md shadow-xl shadow-darkCyan/10; border-l-[6px] border-l-darkCyan;" >
                    <div class="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-6 min-w-max">
                        <div class="circle w-16 h-16 rounded-full md:w-auto md:h-auto md:rounded-full relative -top-8 md:top-0">
                            <img :src="job.logo" class="rounded-full" :alt="job.company">
                        </div>
                        <div class="space-y-2">
                            <div class="flex flex-start space-x-1">
                                <span class="text-darkCyan font-bold mr-3"> {{ job.company }} </span>
                                <span v-if="job.isnew" id="jobs-new" class="bg-darkcyan text-white text-xs uppercase p-2 pb-1.5 rounded-full news"> new! </span>
                                <span v-if="job.featured" id="jobs-featured" class=" text-white text-xs uppercase p-2 pb-1.5 rounded-full featured"> featured </span>
                            </div>
                            <h4 class="font-bold text-[21px] text-left hover:text-darkCyan transition-all cursor-pointer">
                              {{ job.position }}
                            </h4>
                            <ul class="flex list-disc list-inside space-x-4">
                                <li class="text-darkGrayishCyan list-none">postedAt</li>
                                <li class="text-darkGrayishCyan">{{ job.contract }}</li>
                                <li class="text-darkGrayishCyan">{{ job.location }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex items-center flex-wrap gap-2 md:gap-4 my-4 md:my-0 border-t-[1px] md:border-t-0 pt-4 hover:text-white md:pt-0 md:ml-4 border-grayish-cyan-medium;">
                      <span class="tag" v-for="role in job.roles" :key="role">{{ role }}</span>
                      <span class="tag" v-for="level in job.levels" :key="level">{{ level }}</span>
                      <span class="tag" v-for="language in job.languages" :key="language">{{ language }}</span>
                      <span class="tag" v-for="tool in job.tools" :key="tool">{{ tool }}</span>
                    </div>
                  </div>
            </div>
        </main>
    </section>
  </template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { authStore } from "@/store/auth";


const jobsOnly = ref([]);

const handleLogout = () => {
      authStore().logout();
      this.$router.push({ name: 'Login' });
    }


onMounted(async () => {
  try {
    const response = await axios.get("/api/jobs?perPage=11");
    jobsOnly.value = response.data.data.jobs;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});


</script>

<style>
.tag,
.close-tag {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: hsl(180, 31%, 95%);
    font-weight: 700;
    font-size: 15px;
    color: #5DA4A4;
    margin: 7.5px 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
}

.close-tag {
    padding-right: 45px;
}

.close-tag::after {
    content: "";
    display: block;
    width: 35px;
    height: 100%;
    background-color: #5DA4A4;
    position: absolute;
    right: 0;
    top: 0;
    background-image: url('../assets/icon-remove.svg');
    background-position: center;
    background-size: 15px;
    background-repeat: no-repeat;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.close-tag:hover::after {
    background-color: #2C3A3A;
    color: #fff;
}


.tag:hover {
    background-color: #5DA4A4;
    color: #fff;
}

/* .container {
    max-width: 1110px;
    width: auto;
    display: block;
    margin: 0 auto;
    padding: 0 40px 40px;
} */

.search {
    width: 100%;
    height: auto;
    min-height: 70px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 15px -7px rgba(93,164,164,0.5);
    padding: 20px 40px;
    box-sizing: border-box;
    margin-top: -36px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    transition: opacity 1s;
}

.search--hidden {
    opacity: 0;
}

.search__clear {
    margin-left: 50px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: var(--highlight-color);
    font-weight: 700;
    outline: none;
    cursor: pointer;
}

.search__clear:hover {
    text-decoration: underline;
}

.news{
    padding-right: 10px;
    background-color: #5BA4A4;
    font-size: 14px;
    font-weight: 700;
    border-radius: 9999px;
    padding-left: 10px;
    padding-top: 8px;
    color: white;
}
.featured {
    padding-right: 10px;
    background-color: #2C3A3A;
    font-size: 14px;
    font-weight: 700;
    border-radius: 9999px;
    border-inline-start-color: #5DA4A4;
    padding-left: 10px;
    padding-top: 8px;
    color: white;
}
.bord{
    border-left-width: 6px;
    border-color: #5BA4A4;
}
   </style>
  