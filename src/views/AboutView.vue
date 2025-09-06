<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
  /*export default {
    data() {
        return {
            posts: [],
            embed: true,  
            status:'publish',
            page: 1,
            fontSize: '4rem',
            isLoading: false,
            per_page: 10,
            numOffset: 0,
            totalPosts: 0,
            heightImage: '150px',

        }
    },
    created() {
        this.isLoading = true; 
            this.axios.get(`wp/v2/posts?_embed&per_page=${this.per_page}&offset=${this.numOffset}`)
            .then(response => {
                console.log(response.data)
                this.posts = response.data;
                this.totalPosts = response.headers['x-wp-total'];
                console.log(this.posts)
            })
            .finally(() =>
                this.isLoading = false
            );
    },
    methods: {
    }
  }*/
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
