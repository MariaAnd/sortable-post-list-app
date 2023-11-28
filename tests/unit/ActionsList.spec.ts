import { mount } from "@vue/test-utils";
import ActionsList from "@/components/ActionsList.vue";

jest.mock("@/stores/PostsStore", () => ({
  usePostsStore: () => ({
    fetchPosts: jest.fn(),
    restoreState: jest.fn(),
    actions: [
      { description: "Action 1", postsList: [{ id: "1" }, { id: "2" }] },
    ],
  }),
}));

describe("ActionsList", () => {
  it("renders and displays actions", () => {
    const wrapper = mount(ActionsList);
    expect(wrapper.text()).toContain("List of actions commited");
    expect(wrapper.findAll("li")).toHaveLength(1);
    expect(wrapper.text()).toContain("Action 1");
  });

  it("time travel button restores state", async () => {
    const wrapper = mount(ActionsList);
    await wrapper.find("button").trigger("click");
    const restoreStateMock = wrapper.vm.store.restoreState;
    expect(restoreStateMock).toHaveBeenCalledWith(0);
  });
});
