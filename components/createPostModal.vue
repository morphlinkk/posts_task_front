<template>
   <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10" @click.self="$emit('close')">
      <div v-if="store.showThrobber" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div role="status">
            <div
               class="inline-block size-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
               role="status">
               <span
                  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                  >
            </div>
            <span class="sr-only">Loading...</span>
         </div>
      </div>
      <div v-if="!isSuccessModal" class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
         <div class="w-full">
            <div class="m-8 my-16 max-w-[400px] mx-auto">
               <div class="mb-4">
                  <h1 class="mb-4 text-3xl font-extrabold text-gray-900">Create Post</h1>
                  <div class="font-bold text-gray-700">User Id</div>
                  <input v-model="userId" class="my-2 w-full border rounded-md px-4 py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="User Id">
                  <div class="font-bold text-gray-700">Post Title</div>
                  <input v-model="title" class="my-2 w-full border rounded-md px-4 py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="Title">
                  <div class="mb-6">
                     <label for="postContent" class="block text-gray-700 text-sm font-bold mb-2">Post Body:</label>
                     <textarea v-model="body" id="postContent" name="postContent" rows="4" class="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="What's on your mind?"></textarea>
                  </div>
               </div>
               <div class="space-y-4 mt-2">
                  <button class="p-3 bg-gray-900 rounded-full text-white w-full font-semibold" @click="createPost">Create Post</button>
                  <button class="p-3 bg-slate-50 border rounded-full w-full font-semibold" @click="$emit('close')">Close Window</button>
               </div>
            </div>
         </div>
      </div>
      <div v-else class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white" @click.stop>
         <div class="w-full">
            <div class="m-8 my-16 max-w-[400px] mx-auto text-center">
               <h1 v-if="isSuccess" class="mb-8 text-3xl font-extrabold text-green-300">
                  Post Created Successfully!
                  <div class="mt-8 text-xl font-regular text-gray-700">{{ createdPost }}</div>
               </h1>
               <h1 v-else class="mb-4 text-3xl font-extrabold text-red-300">Failed to Create Post</h1>
               <button class="p-3 bg-gray-900 rounded-full text-white w-full font-semibold" @click="$emit('close')">Close</button>
            </div>
         </div>
      </div>
   </div>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '~/store/posts';

const store = usePostStore();
const userId = ref('');
const title = ref('');
const body = ref('');
const isSuccessModal = ref(false);
const isSuccess = ref(true);
const createdPost = ref({})

async function createPost() {
   try {
      const post = {
         userId: parseInt(userId.value),
         title: title.value,
         body: body.value,
      }
      createdPost.value = await store.createPost(post)
      console.log(createdPost.value)
   } catch {
      isSuccess.value=false
   } finally {
      isSuccessModal.value = true;
   }  
}
</script>