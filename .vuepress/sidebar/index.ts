import { sidebar } from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
    "/": [
      {
        text: "Intro",
        icon: "ic:round-home",
        link: "/",
      },
      {
        text: "Endpoints",
        icon: "tabler:api",
        collapsible: true,
        children: [
          {
            text: "Available Services",
            icon: "ph:folder",
            collapsible: true,
            children: [
              {
                text: "List all available services",
                icon: "tabler:http-get",
                link: "/docs/1.1-Available-Services-Get",
              },
            ]
          },
          {
            text: "Customer Orders",
            icon: "ph:folder",
            collapsible: true,
            children: [
              {
                text: "List customer orders",
                icon: "tabler:http-get",
                link: "/docs/2.1-Customer-Orders-Get",
              },
              {
                text: "Submit new customer order batched",
                icon: "tabler:http-put",
                link: "/docs/2.2-Customer-Orders-put",
              },
            ]
          }
        ],
      },
      {
        text: "Models",
        icon: "ph:code-bold",
        collapsible: true,
        children: [
          {
            text: "Customer Order Model",
            icon: "streamline:programming-module-cube-code-module-programming-plugin",
            link: "/docs/models/Customer-Order-Model",
          },
          {
            text: "Customer Order Package Model",
            icon: "streamline:programming-module-cube-code-module-programming-plugin",
            link: "/docs/models/Customer-Order-Package-Model",
          },
          {
            text: "Product Model",
            icon: "streamline:programming-module-cube-code-module-programming-plugin",
            link: "/docs/models/Product-Model",
          }
        ],
      },
    ],
  });
  