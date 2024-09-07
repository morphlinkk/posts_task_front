<template>
    <div class="max-w-[1280px] mx-auto">
        <div class="w-full flex justify-between items-center mb-3 mt-1 pl-3"></div>
        <div class="">
        <h3 class="text-lg font-semibold text-slate-800 ml-4">Posts</h3>
        <div class="flex items-center justify-between px-4 py-3">
            <p class="text-slate-500">Table with posts</p>
            <button @click="openModal" class="font-bold text-slate-700">Create Post</button>
        </div>
        </div>
        <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table class="w-full text-left table-fixed min-w-max">
                <thead>
                    <tr>
                        <th class="p-4 w-16 border-b border-slate-200 bg-slate-50 text-center cursor-pointer hover:bg-slate-100" @click="store.toggleSortOrder">
                            <p class="text-sm font-normal leading-none text-slate-500">Id</p>
                        </th>
                        <th class="p-4 w-16 border-b border-slate-200 bg-slate-50 text-center">
                            <p class="text-sm font-normal leading-none text-slate-500">UserId</p>
                        </th>
                        <th class="p-4 w-3/12 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">Title</p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">Description</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="store.showThrobber">
                        <tr v-for="n in 10" :key="n" class="hover:bg-slate-50 border-b border-slate-200 h-16">
                            <PostsSkeleton />
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="post in posts" :key="post.id" class="hover:bg-slate-50 border-b border-slate-200 h-16">
                            <PostTemplate :post="post" />
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="flex justify-between items-center px-4 py-3" v-if="posts.length!=0">
                <div class="text-sm text-slate-500">
                Showing <b>{{ displayStartIndex  }}-{{ displayEndIndex }}</b> of {{ store.totalPostsCount }}
                </div>
                <div class="flex space-x-1">
                    <button @click="prevPage" class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                    </button>
                    <button @click="() => { store.page = page; store.getPostsList() }" v-for="page in store.totalPages" :key="page" class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        {{ page }}
                    </button>
                    <button @click="nextPage" class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    <CreatePostModal v-if="showModal" @close="closeModal"/>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/posts';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const store = usePostStore();
store.getPostsList();
const { posts } = storeToRefs(store);

function prevPage() {
    if (store.page > 1) {
        store.page--;
        store.getPostsList();
    }
}

function nextPage() {
    if (store.page < store.totalPages) {
        store.page++;
        store.getPostsList();
    }
}

const showModal = ref(false);

function openModal() {
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}

const displayStartIndex = computed(() => {
    if (store.sortOrder === 'asc') {
        return (store.page - 1) * store.limit + 1;
    } else {
        return store.totalPostsCount - (store.page * store.limit - store.limit);
    }
});

const displayEndIndex = computed(() => {
    if (store.sortOrder === 'asc') {
        return Math.min(store.page * store.limit, store.totalPostsCount);
    } else {
        return store.totalPostsCount - (store.page  * store.limit) + 1;
    }
});
</script>
