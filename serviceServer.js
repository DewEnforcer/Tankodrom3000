const boxWrapper = document.querySelector(".services_wrapper");
let services = undefined;
let openStatus = [];
const listStyler = "- ";
const serviceLoader = async () => {
  if (typeof services !== "undefined") return; //loaded already;
  const res = await fetch("./services.json");
  services = await res.json();
  generateServices();
};
const handleMoreInfo = (ev) => {
  const id = Number(ev.currentTarget.id.split("_")[1]);
  const see_more_box = ev.currentTarget.children[1];
  let display = "none";
  if (!openStatus[id]) {
    display = "flex";
    ev.currentTarget.classList.add("active");
  } else {
    ev.currentTarget.classList.remove("active");
  }
  see_more_box.style.display = display;
  openStatus[id] = !openStatus[id];
};

const generateServices = () => {
  boxWrapper.innerHTML = "";
  const values = Object.values(services[currentLanguage]);
  openStatus = [];
  values.forEach((serv, index) => {
    let box = document.createElement("div");
    let wrapperMoreInfo = document.createElement("div");
    let teaserImage = document.createElement("img");
    let offerTitle = document.createElement("h3");
    offerTitle.innerHTML = serv.includes_title;
    teaserImage.src = `./images/service${index}.jpg`;
    wrapperMoreInfo.className = "see_more_box flexColumn flexCenter";
    box.className = "service_box flexCenter flexColumn";
    box.id = "box_" + index;
    let title = document.createElement("h2");
    title.innerHTML = serv.title;
    let description = document.createElement("p");
    description.innerHTML = serv.description;
    description.classList.add("service_description");
    let includeList = document.createElement("ul");
    Object.values(serv.includes).forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = listStyler + item;
      includeList.appendChild(li);
    });
    let addit = document.createElement("p");
    addit.innerHTML = serv.additional;
    addit.classList.add("service_additional");
    box.appendChild(title);
    wrapperMoreInfo.appendChild(teaserImage);
    wrapperMoreInfo.appendChild(description);
    wrapperMoreInfo.appendChild(offerTitle);
    wrapperMoreInfo.appendChild(includeList);
    wrapperMoreInfo.appendChild(addit);
    box.appendChild(wrapperMoreInfo);
    boxWrapper.appendChild(box);
    box.addEventListener("click", handleMoreInfo);
    openStatus.push(false);
  });
};

serviceLoader();
