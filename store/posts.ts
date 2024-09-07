import { defineStore } from 'pinia';

export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [] as { id: number; userId: number; title: string; body: string}[],
        totalPostsCount: 0,
        showThrobber: true,
        page: 1,
        limit: 10,
        sortOrder: 'asc'
    }),
    getters: {
        totalPages(state) {
            return Math.ceil(state.totalPostsCount / state.limit);
        }
    },
    actions: {
        async getPostsList() {
            this.showThrobber = true;
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}&_sort=id&_order=${this.sortOrder}`);
                const data = await response.json();
                
                this.totalPostsCount = parseInt(response.headers.get('X-Total-Count') ?? '0');
                
                this.posts = data.map((post: { id: number; userId: number; title: string; body: string }) => ({
                    ...post
                }));
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                this.showThrobber = false;
            }
        },
        toggleSortOrder() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            this.getPostsList();
        }
    },
});
