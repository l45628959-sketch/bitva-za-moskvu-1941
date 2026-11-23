document.addEventListener("DOMContentLoaded", () => {
  // 1. ПЛАВНОЕ ОТКРЫТИЕ СТРАНИЦЫ (Убираем шторку)
  const transitionEl = document.querySelector(".page-transition");
  if (transitionEl) {
    setTimeout(() => {
      transitionEl.classList.add("hidden");
    }, 250);
  }

  // Плавный переход при клике на ссылки меню
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("http")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (transitionEl) {
          transitionEl.classList.remove("hidden");
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        } else {
          window.location.href = href;
        }
      });
    }
  });

  // 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 3. АНИМАЦИЯ СЧЁТЧИКОВ ЦИФР НА ГЛАВНОЙ
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const duration = 1800; // 1.8 секунды
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target.toLocaleString("ru-RU");
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(current).toLocaleString("ru-RU");
      }
    }, stepTime);
  });

  // 4. ИНТЕРАКТИВНЫЕ СВОДКИ СОВИНФОРМБЮРО (Эффект печатной машинки)
  const dispatches = [
    {
      date: "16 НОЯБРЯ 1941 ГОДА • РАЗЪЕЗД ДУБОСЕКОВО",
      text: "«В течение дня на Волоколамском направлении наши части вели ожесточённые бои с танками и пехотой противника. Бойцы 316-й стрелковой дивизии генерала Панфилова отбили несколько массированных атак, уничтожив 18 вражеских танков.»"
    },
    {
      date: "6 ДЕКАБРЯ 1941 ГОДА • НАЧАЛО КОНТРНАСТУПЛЕНИЯ",
      text: "«Войска Западного фронта, измотав противника в предшествующих боях, перешли в контрнаступление против его ударных фланговых группировок. Враг спешно отступает, бросая технику и боеприпасы.»"
    },
    {
      date: "12 ДЕКАБРЯ 1941 ГОДА • ПРОВАЛ ПЛАНА «ТАЙФУН»",
      text: "«В последний час: Провал немецкого плана окружения и взятия Москвы. Освобождены города Солнечногорск, Истра, Сталиногорск. Угроза столице ликвидирована героическими усилиями Красной Армии.»"
    },
    {
      date: "7 НОЯБРЯ 1941 ГОДА • ПАРАД НА КРАСНОЙ ПЛОЩАДИ",
      text: "«Сегодня в Москве состоялся традиционный военный парад. Прямо с Красной площади полки пехоты, артиллерии и танков уходили на передовую, находящуюся всего в нескольких десятках километров от столицы.»"
    }
  ];

  let currentDispatch = 0;
  const dateEl = document.getElementById("dispatch-date");
  const textEl = document.getElementById("dispatch-text");
  const nextBtn = document.getElementById("next-dispatch-btn");

  let typeTimer;
  function showDispatch(index) {
    if (!dateEl || !textEl) return;
    clearInterval(typeTimer);
    dateEl.innerText = dispatches[index].date;
    textEl.innerText = "";
    const fullText = dispatches[index].text;
    let i = 0;
    typeTimer = setInterval(() => {
      textEl.innerText += fullText.charAt(i);
      i++;
      if (i >= fullText.length) clearInterval(typeTimer);
    }, 20);
  }

  if (nextBtn) {
    showDispatch(0);
    nextBtn.addEventListener("click", () => {
      currentDispatch = (currentDispatch + 1) % dispatches.length;
      showDispatch(currentDispatch);
    });
  }
});
