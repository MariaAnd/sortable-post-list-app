import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { usePostsStore } from "@/stores/PostsStore";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Posts Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetches posts successfully", async () => {
    const mockPosts = [{ id: "1" }]; // Mock response
    mockedAxios.get.mockResolvedValue({ data: mockPosts });
    const store = usePostsStore();
    await store.fetchPosts();
    expect(store.posts).toEqual(mockPosts);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });

  it("handles fetch error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Any Error"));
    const store = usePostsStore();
    await store.fetchPosts();
    expect(store.posts).toEqual([]);
  });

  it("moves a post correctly", () => {
    const store = usePostsStore();
    store.posts = [{ id: "1" }, { id: "2 " }, { id: "3" }];
    store.movePost({ id: "2" }, 1, 0);
    expect(store.posts[0].id).toBe("2");
    expect(store.actions[0].description).toContain(
      "Moved Post 2 from index 1 to index 0"
    );
  });

  it("restores state correctly", () => {
    const store = usePostsStore();
    store.posts = [{ id: "1" }, { id: "2" }];
    store.actions = [{ description: "Test Action", postsList: [{ id: "3" }] }];
    store.restoreState(0);
    expect(store.posts).toEqual([{ id: "3" }]);
    expect(store.actions).toEqual([]);
  });
});
