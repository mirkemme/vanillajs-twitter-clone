export const cE = (type) => document.createElement(type);

export const tweetGen = (tweetData) => {
    const wrapperEl = cE("div");
    const userImageEl = cE("img");
    const contentEl = cE("div");
    const userEls = cE("div");
    const nameEl = cE("p");
    const userNameEl = cE("p");
    const textContentEl = cE("p");
    const reactionsEl = cE("div");
    const likeValueEl = cE("div");
    const iconEl = cE("div");
    const imagePlaceholder = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    wrapperEl.className = "tweet";
    contentEl.className = "tweet__content";
    userEls.className = "tweet__content__user";
    nameEl.className = "user__name";
    userNameEl.className = "user__username";
    reactionsEl.className = "tweet__reactions";
    likeValueEl.className = "tweet__like__value";
    iconEl.className = "tweet__icon__heart";

    userImageEl.src = tweetData.user?.image || imagePlaceholder;
    userImageEl.alt = tweetData.user?.username;
    nameEl.textContent = tweetData.user?.firstName + tweetData.user?.lastName || "Salvatore Imerese";
    userNameEl.textContent = "@" + (tweetData.user?.username || "salvatoreimerese");
    textContentEl.textContent = tweetData.body;
    likeValueEl.textContent = tweetData.reactions;

    userEls.append(nameEl, userNameEl);
    contentEl.append(userEls, textContentEl, reactionsEl);
    wrapperEl.append(userImageEl, contentEl);
    reactionsEl.append(iconEl, likeValueEl);

    return wrapperEl;
};

export const whoToFollowGen = (user) => {
    const wrapperEl = cE("div");
    const imageEl = cE("img");
    const userElsWrapper = cE("div");
    const userDataText = cE("div");
    const nameEl = cE("p");
    const userNameEl = cE("p");
    const followBtnEl = cE("button");

    wrapperEl.className = "whoToFollow__item";
    userElsWrapper.className = "whoToFollow__item__wrapper";
    userDataText.className = "whoToFollow__item__user";
    nameEl.className = "whoToFollow__item__name";
    userNameEl.className = "whoToFollow__item__username";
    followBtnEl.className = "whoToFollow__button";

    nameEl.textContent = user?.firstName + user?.lastName || "Salvatore Imerese";
    userNameEl.textContent = "@" + user?.username || "@salvatoreimerese";
    imageEl.src = user?.image || imagePlaceholder;
    followBtnEl.textContent = "Segui";

    userDataText.append(nameEl, userNameEl);
    userElsWrapper.append(imageEl, userDataText);
    wrapperEl.append(userElsWrapper, followBtnEl);

    return wrapperEl;
}