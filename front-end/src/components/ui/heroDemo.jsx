"use client";
import React from "react";
import { HeroParallax } from "../ui/hero";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "World News",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://d1ooscleda9ip9.cloudfront.net/Upload/687/CMS/News/Photos/bec1bb2c-28c.jpg",
  },
  {
    title: "Business News",
    link: "https://cursor.so",
    thumbnail:
      "https://i.pinimg.com/550x/d4/06/39/d406390f1b8850c85f1d6f7a93967286.jpg",
  },
  {
    title: "Politics",
    link: "https://userogue.com",
    thumbnail:
      "https://prod-upp-image-read.ft.com/e0f0926c-d8c3-11e6-944b-e7eb37a6aa8e",
  },

  {
    title: "Technology",
    link: "https://editorially.org",
    thumbnail:
      "https://cdn.analyticsvidhya.com/wp-content/uploads/2023/09/blog_intro_Y5W3Phu.jpeg",
  },
  {
    title: "Science",
    link: "https://editrix.ai",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMP0Pr2XYY6gUcqdOTMaJNRuCyWUlJCdmuJKJfdeOtFA&s",
  },
  {
    title: "Entertainment",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://www.billboard.com/wp-content/uploads/2023/08/Best-Album-Covers-of-All-Time-billboard-1548.jpg?w=875&h=583&crop=1",
  },

  {
    title: "Sports",
    link: "https://algochurn.com",
    thumbnail:
      "https://wallpapers.com/images/featured/sports-4cst9o5vvexe8hu4.jpg",
  },
  {
    title: "Health",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://static.wixstatic.com/media/45a1fb_257e16549e8244a185764b92e76ddb6e~mv2.jpg/v1/fill/w_640,h_326,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/45a1fb_257e16549e8244a185764b92e76ddb6e~mv2.jpg",
  },
  {
    title: "Lifestyle",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://hips.hearstapps.com/hmg-prod/images/aesthetic-outfits-1652204927.png?crop=1xw:0.8439578713968958xh;center,top&resize=1200:*",
  },
  {
    title: "StartUps",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:2000/1*YILKbhDGDlt9KLuQxLn63w.jpeg",
  },
];
