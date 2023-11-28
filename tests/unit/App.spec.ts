import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          PostsList: {
            template: "<span>Posts</span>",
          },
          ActionsList: {
            template: "<span>Actions</span>",
          },
        },
      },
    });
    expect(wrapper.html()).toContain("Posts");
    expect(wrapper.html()).toContain("Actions");
  });
});
