<script lang="ts" setup>
import ArrowButton from "../components/ArrowButton.vue";

import { usePostsStore } from "@/stores/PostsStore";

import { computed } from "vue";

const store = usePostsStore();
store.fetchPosts();
const postsComputed = computed(() => store.posts);
const move = (indexFrom: number, direction: number) => {
  const indexTo = indexFrom + direction;
  const post = postsComputed.value[indexFrom];
  store.movePost(post, indexFrom, indexTo);
};
</script>

<template>
  <div class="posts-container text-gray-600">
    <h1 class="text-4xl text-white mb-6">Sortable Posts List</h1>
    <transition-group
      name="flip-posts"
      v-if="postsComputed && postsComputed.length > 0"
      tag="ul"
    >
      <li
        v-for="(post, index) in postsComputed"
        :key="post.id"
        class="h-24 flex justify-between items-center bg-white px-4 py-2 rounded shadow-md mb-4"
      >
        <h3 class="text-2xl">
          {{ `Post ${post.id}` }}
        </h3>
        <div
          :class="[
            'h-full flex flex-col',
            index === 0 || index === postsComputed.length - 1
              ? 'justify-center'
              : 'justify-between',
          ]"
        >
          <ArrowButton
            v-if="index !== 0"
            class="rotate-180"
            @click="move(index, -1)"
          ></ArrowButton>
          <ArrowButton
            v-if="index !== postsComputed.length - 1"
            @click="move(index, 1)"
          ></ArrowButton>
        </div>
      </li>
    </transition-group>
    <div v-else>Loading posts ...</div>
  </div>
</template>

<style scoped>
.flip-posts-move {
  transition: transform 0.5s;
}

.flip-posts-enter-active,
.flip-posts-leave-active {
  transition: all 0.5s ease;
}

.flip-posts-enter,
.flip-posts-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
