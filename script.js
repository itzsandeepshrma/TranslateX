particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 2 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

function translateText() {
  const input = document.getElementById("inputText").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;

  if (!input) {
    document.getElementById("translatedText").innerText = "Enter text to translate.";
    return;
  }

  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=${from}|${to}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      document.getElementById("translatedText").innerText = data.responseData.translatedText || "Translation failed.";
    })
    .catch(() => {
      document.getElementById("translatedText").innerText = "Error during translation.";
    });
}

function swapLanguages() {
  const from = document.getElementById("fromLang");
  const to = document.getElementById("toLang");
  [from.value, to.value] = [to.value, from.value];
  translateText();
}

function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("translatedText").innerText = "Translated text will appear here...";
}

function speakText() {
  const text = document.getElementById("translatedText").innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
