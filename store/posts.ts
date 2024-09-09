export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [] as { id: number; userId: number; title: string; body: string}[],
        totalPostsCount: 0,
        showThrobber: true,
        page: 1,
        limit: 10,
        sortOrder: 'asc',
    }),
    getters: {
        totalPages(state) {
            return Math.ceil(state.totalPostsCount / state.limit);
        },
        currentPagePosts(state) {
            const start = ((state.page-1)*state.limit)+1
            const end = (state.page*state.limit)
            const postsArray = Object.values(state.posts);

            const filteredPosts = postsArray.filter(post => post.id >= start && post.id <= end);
            return filteredPosts
        }
    },
    actions: {
        async getPostsList() {
            this.showThrobber = true;
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}&_sort=id&_order=${this.sortOrder}`);
                const data = await response.json();
                const serverPostsCount = parseInt(response.headers.get('X-Total-Count') ?? '0')
                if (this.totalPostsCount < serverPostsCount){this.totalPostsCount=serverPostsCount};

                data.forEach((post: { id: number; userId: number; title: string; body: string }) => {
                    this.posts[post.id] = {
                        id: post.id,
                        userId: post.userId,
                        title: post.title,
                        body: post.body
                    };
                });
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                this.showThrobber = false;
            }
        },
        toggleSortOrder() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            this.getPostsList();
        },
        async createPost(post: { userId: number; title: string; body: string }) {
            this.showThrobber = true;
            let responsePost = {};
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
    
                if (response.ok) {
                    const createdPost = await response.json();
                    
                    this.posts.push({
                        id: createdPost.id,
                        userId: createdPost.userId,
                        title: createdPost.title,
                        body: createdPost.body,
                    });
                    
                    this.totalPostsCount += 1;
                    responsePost = createdPost
                } else {
                    console.error('Failed to create post:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to create post:', error);
            } finally {
                this.showThrobber = false;
                return responsePost
            }
        },
    },
});