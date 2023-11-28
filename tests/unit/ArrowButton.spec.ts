import { mount } from "@vue/test-utils";
import ArrowButton from "@/components/ArrowButton.vue";

describe("ArrowButton", () => {
  it("renders svg", () => {
    const wrapper = mount(ArrowButton);
    const svg = wrapper.find("svg");
    expect(svg.exists()).toBeTruthy();
    expect(svg.attributes("width")).toBe("20");
    expect(svg.attributes("height")).toBe("20");
    expect(svg.classes()).toContain("text-indigo-600");
  });
});
