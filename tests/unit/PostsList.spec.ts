import { mount } from "@vue/test-utils";
import PostsList from "@/components/PostsList.vue";

jest.mock("@/stores/PostsStore", () => ({
  usePostsStore: () => ({
    fetchPosts: jest.fn(),
    movePost: jest.fn(),
    posts: [{ id: "1" }, { id: "2" }],
  }),
}));

describe("PostsList", () => {
  it("renders and displays posts", () => {
    const wrapper = mount(PostsList);
    expect(wrapper.text()).toContain("Sortable Posts List");
    expect(wrapper.findAll("li")).toHaveLength(2);
    expect(wrapper.text()).toContain("Post 1");
    expect(wrapper.text()).toContain("Post 2");
  });

  it("moves a post when the up arrow is clicked", async () => {
    const wrapper = mount(PostsList);
    await wrapper.findAll("button")[0].trigger("click");
    const movePostMock = wrapper.vm.store.movePost;
    expect(movePostMock).toHaveBeenCalledWith({ id: "1" }, 0, 1);
  });

  it("moves a post when the down arrow is clicked", async () => {
    const wrapper = mount(PostsList);
    await wrapper.findAll("button")[1].trigger("click");
    const movePostMock = wrapper.vm.store.movePost;
    expect(movePostMock).toHaveBeenCalledWith({ id: "2" }, 1, 0);
  });
});
