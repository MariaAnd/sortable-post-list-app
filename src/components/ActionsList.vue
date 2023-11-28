<script lang="ts" setup>
import { usePostsStore } from "@/stores/PostsStore";
import { computed } from "vue";

const store = usePostsStore();

const actionsComputed = computed(() => store.actions);
const timeTravel = (index: number) => {
  store.restoreState(index);
};
</script>

<template>
  <div class="actions-container text-gray-600 shadow-md rounded h-auto">
    <h2 class="bg-white p-6 text-3xl rounded-t">List of actions commited</h2>
    <transition-group
      name="remove-actions"
      v-if="actionsComputed.length > 0"
      class="list-none p-6"
      tag="ul"
    >
      <li
        v-for="(action, index) in actionsComputed"
        :key="action.description"
        class="flex justify-between items-center bg-white px-4 py-3 rounded shadow-md mb-[1px]"
      >
        <h4 class="text-xl mr-6">
          {{ action.description }}
        </h4>
        <button
          class="bg-green-400 whitespace-nowrap p-4 rounded text-gray-900 font-bold"
          @click="timeTravel(index)"
        >
          Time travel
        </button>
      </li>
    </transition-group>
    <div class="p-6" v-else>No actions yet</div>
  </div>
</template>

<style scoped>
.remove-actions-enter-active,
.remove-actions-leave-active {
  transition: opacity 0.5s ease;
}

.remove-actions-enter-from,
.remove-actions-leave-to {
  opacity: 0;
}
</style>
