export const SITE = {
  website: "https://erycwang.github.io/",
  author: "Eric Wang",
  profile: "https://www.linkedin.com/in/eric-wang-593102a6/",
  desc: "A collection of things I've learned and other observations from working in the product / strategy space.",
  title: "Eric Wang's Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York",
} as const;
