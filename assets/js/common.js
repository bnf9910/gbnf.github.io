window.onload = function () {
  var currentPageUrl = window.location.href;
  var fileName = currentPageUrl.substring(currentPageUrl.lastIndexOf("/") + 1);

  var secondLiA;
  var intervalId = setInterval(function () {
    if (fileName === "index.html") {
      secondLiA = document.querySelector(
        "header .container .gnb-menu ul li:nth-child(1) a"
      );
    } else if (fileName === "about.html") {
      secondLiA = document.querySelector(
        "header .container .gnb-menu ul li:nth-child(2) a"
      );
    } else if (fileName === "work.html") {
      secondLiA = document.querySelector(
        "header .container .gnb-menu ul li:nth-child(3) a"
      );
    }

    if (secondLiA) {
      secondLiA.classList.add("on");
      clearInterval(intervalId);

      var korean = document.getElementById("ko__btn"),
        english = document.getElementById("en__btn"),
        ko_txt = document.querySelectorAll("#ko"),
        en_txt = document.querySelectorAll("#en"),
        array_en = en_txt.length;
      (array_ko = ko_txt.length),
        korean.addEventListener(
          "click",
          function () {
            langue(korean, english);
          },
          false
        );
      english.addEventListener(
        "click",
        function () {
          langue(english, korean);
        },
        false
      );
      function langue(langueOn, langueOff) {
        if (!langueOn.classList.contains("active_lang")) {
          langueOn.classList.toggle("active_lang");
          langueOff.classList.toggle("active_lang");
        }

        if (langueOn.innerHTML == "한국어") {
          afficher(ko_txt, array_ko);
          cacher(en_txt, array_en);

          sessionStorage.setItem("selectedLanguage", "ko");
        } else if (langueOn.innerHTML == "English") {
          afficher(en_txt, array_en);
          cacher(ko_txt, array_ko);

          sessionStorage.setItem("selectedLanguage", "en");
        }
      }
      function afficher(txt, array) {
        for (var i = 0; i < array; i++) {
          txt[i].style.display = "block";
        }
      }
      function cacher(txt, array) {
        for (var i = 0; i < array; i++) {
          txt[i].style.display = "none";
        }
      }
      function init() {
        langue(korean, english);
      }

      var selectedLanguage = sessionStorage.getItem("selectedLanguage");
      if (selectedLanguage === "ko") {
        langue(korean, english);
      } else if (selectedLanguage === "en") {
        langue(english, korean);
      } else {
        init();
      }
    }
  }, 100); // 100ms마다 함수 실행
};
