import { defineStore } from "pinia";
import { Post } from "@/interfaces/Post.interface";
import { PostAction } from "@/interfaces/State.interface";
import axios from "axios";
import { Ref, ref } from "vue";

export const usePostsStore = defineStore("posts", () => {
  const posts: Ref<Array<Post>> = ref([]);
  const actions: Ref<Array<PostAction>> = ref([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      posts.value = response.data.slice(0, 5);
    } catch (error) {
      console.log("Error fetching posts");
    }
  };

  const movePost = (post: Post, fromIndex: number, toIndex: number) => {
    const action = {
      description: `Moved Post ${post.id} from index ${fromIndex} to index ${toIndex}`,
      postsList: [...posts.value],
    };
    actions.value.unshift(action);
    posts.value.splice(fromIndex, 1);
    posts.value.splice(toIndex, 0, post);
  };

  const restoreState = (actionIndex: number) => {
    const action: PostAction = actions.value[actionIndex];
    posts.value = action.postsList;
    // remove clicked action and action cards above it
    actions.value = actions.value.slice(actionIndex + 1);
  };

  return {
    posts,
    actions,
    fetchPosts,
    movePost,
    restoreState,
  };
});
