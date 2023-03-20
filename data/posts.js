export const postsScreenArray = [
  {
    id: 1,
    img: require("../assets/images/forrest.jpg"),
    title: "Forest",
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require("../assets/images/sunset.jpg"),
    title: "Black Sea sunset",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require("../assets/images/oldhouse.jpg"),
    title: "An old house in Venice",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];

export const profilePostArray = [
  {
    id: 1,
    img: require("../assets/images/forrest.jpg"),
    title: "Forest",
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require("../assets/images/sunset.jpg"),
    title: "Black Sea sunset",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require("../assets/images/oldhouse.jpg"),
    title: "An old house in Venice",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];

export const commentPostArray = {
  id: 1,
  postImage: require("../assets/images/sunset.jpg"),
  title: "Sunset on the Black Sea",
  location: "Ukraine",
  comments: 3,
  commentsTexts: [
    {
      id: 10,
      date: "09 june, 2020",
      time: "08:40",
      userAvatar: require("../assets/images/avatarNo.jpg"),
      text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    },
    {
      id: 11,
      userAvatar: require("../assets/images/avatarYes.jpg"),
      date: "09 june, 2020",
      time: "09:14",
      text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    },
    {
      id: 12,
      date: "09 june, 2020",
      time: "09:20",
      userAvatar: require("../assets/images/avatarNo.jpg"),
      text: "Thank you! That was very helpful!",
    },
  ],
};
