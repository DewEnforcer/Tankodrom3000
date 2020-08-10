const avalLanguages = ["cz", "en"];
const KEY_LANGUAGE = "KEY_LANGUAGE";
let currentLanguage = localStorage.getItem(KEY_LANGUAGE);
if (currentLanguage == null) currentLanguage = avalLanguages[0];
const toTranslateEl = document.querySelectorAll(".translate");
let data = null;
const fetchTranslations = async () => {
  if (data != null) return;
  const response = await fetch("./text.json");
  data = await response.json();
  translateElements();
};
const translateElements = () => {
  const useTranslation = data[currentLanguage];
  toTranslateEl.forEach((element) => {
    const attributes = element.id.split("_");
    element.innerHTML = useTranslation[attributes[0]][attributes[1]];
  });
};
const handleLanguageChange = (ev) => {
  const newLanguage = ev.target.attributes.value.value;
  if (currentLanguage === newLanguage) return;
  localStorage.setItem(KEY_LANGUAGE, newLanguage);
  currentLanguage = newLanguage;
  if (window.location.href.includes("services")) generateServices();
  translateElements();
  handleActiveButton();
};
const handleActiveButton = () => {
  document.querySelectorAll(".btn_language").forEach((el) => {
    el.classList.remove("lang_select");
    if (el.value == currentLanguage) el.classList.add("lang_select");
  });
};

fetchTranslations();
handleActiveButton();
document.querySelectorAll(".btn_language").forEach((el) => {
  el.addEventListener("click", handleLanguageChange);
});
