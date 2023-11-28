<template>
  <div class="bg-gray-200 min-h-screen w-screen absolute">
    <div class="background-clip-path min-h-screen bg-indigo-600"></div>
  </div>
  <main class="min-h-screen container mx-auto p-10 relative">
    <div class="md:flex items-start lg:gap-20 gap-8">
      <PostsList class="basis-1/2" />
      <ActionsList class="basis-1/2" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import PostsList from "@/components/PostsList.vue";
import ActionsList from "@/components/ActionsList.vue";
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.background-clip-path {
  clip-path: polygon(0 0, 0 25%, 100% 0);
  padding: 0 50%;
}
</style>
