import { tweetGen, whoToFollowGen } from "../utils/fn.js";
import { GET } from "../utils/http.js";

let postList = [];
let userList = [];
const navItems = document.querySelectorAll(".navItem");
const contentEl = document.querySelector(".content");
const tabsEl = document.querySelectorAll(".tabBar__tab");
const newTweet = document.querySelector(".postBar");
const followItemsEl = document.querySelector(".whoToFollow__items");

let prodotti = [];
/*** ASYNC ***/
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(x => x.products.forEach(prodotto => prodotti.push(prodotto)))
    .then(() => console.log(prodotti[0]));

const remoteData = Promise.all([GET("/posts"), GET("/users")]);

remoteData
    .then((data) => {
        postList = data[0].posts;
        userList = data[1].users;
    })
    .then(() => {
        postList.map((post) => {
            post.user = userList.find((user) => user.id === post.userId);
            return post;
        }).forEach((post) => contentEl.append(tweetGen(post)));

        userList.slice(0, 10).map((user) => {
            followItemsEl.append(whoToFollowGen(user));
        });
    });

const onHandleSubmit = () => {
    event.preventDefault();
    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: event.target[0].value,
            userId: 5,
            /* other post data */
        })
    })
        .then(res => res.json())
        .then(console.log);
}

/*** EVENTS ***/
navItems.forEach((element) => {
    element.addEventListener("click", () => {
        navItems.forEach((item) => {
            item.classList.remove("active");
        });
        element.classList.add("active");
    });
});

if (tabsEl) {
    tabsEl.forEach((tab) => {
        tab.addEventListener("click", () => {
            let activeTab = document.querySelector(".tabBar__tab.active");
            activeTab.classList.remove("active");
            tab.classList.add("active");
        });
    });
};

/* Listener sul submit del form per postare un nuovo tweet */
newTweet.addEventListener("submit", onHandleSubmit);