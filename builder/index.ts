import builder, { Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";

// import Gallery from "../components/gallery";
// import Header from "../components/header";
// import Fancy from "../components/fancy";
// import Tabs from "../components/tabs";

const PUBLIC_KEY = "961d5089ad3b436f93fa2b4946593071";
builder.init(PUBLIC_KEY);

console.log("Builder - before dynamic imports");

const Header = dynamic(async () => {
  console.log("Header before dynamic start");
  const file = await import("../components/header");
  console.log("Header before dynamic end");
  return file;
});
console.log(Header);

const Gallery = dynamic(async () => {
  console.log("Gallery before dynamic start");
  const file = await import("../components/gallery");
  console.log("Gallery before dynamic end");
  return file;
});
const Fancy = dynamic(async () => {
  const file = await import("../components/fancy");
  return file;
});
const Tabs = dynamic(async () => {
  const file = await import("../components/tabs");
  return file;
});

const Button = dynamic(async () => {
  const file = await import("../components/button");
  return file;
});

console.log("Builder - after dynamic imports");

Builder.register("insertMenu", {
  name: "My favourite components",
  items: [
    { item: "Header", name: "Header" },
    { item: "Gallery", name: "Gallery" },
    { item: "Fancy", name: "Fancy" },
  ],
});

Builder.registerComponent(Header, {
  name: "Header",
  inputs: [
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Change this text",
    },
  ],
});

console.log("After register Header");

const GalleryWithChildren = withChildren(Gallery);

Builder.registerComponent(GalleryWithChildren, {
  name: "Gallery",
  defaultChildren: [],
  childRequirements: {
    message: "You can only put Images.",
    query: {
      "component.name": { $in: ["Image"] },
    },
  },
});

console.log("After register Gallery");

Builder.registerComponent(Fancy, {
  name: "Fancy",
  inputs: [
    {
      name: "image",
      type: "file",
    },
  ],
});

Builder.registerComponent(Tabs, {
  name: "Tabs",
  inputs: [
    {
      name: "tabs",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "text",
          defaultValue: "New tab",
        },
        {
          name: "content",
          type: "uiBlocks",
          defaultValue: [],
        },
      ],
      defaultValue: [
        {
          label: "Tab 1",
          content: [],
        },
      ],
    },
  ],
});

Builder.registerComponent(Button, {
  name: "Core:Button",
  override: true,
  inputs: [
    {
      name: "label",
      type: "text",
      defaultValue: "Click me",
    },
  ],
});
