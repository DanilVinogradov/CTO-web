
//Слайдер бесконечный
window.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content');
  const cards = document.querySelectorAll('.products__card');

  if (!slider || cards.length === 0) return;

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isTransitioning = false;

  // --- Функция перехода к следующему слайду ---
  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    const firstCard = slider.firstElementChild;
    const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
    const width = firstCard.offsetWidth + gap;

    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${width}px)`;

    const handleTransition = () => {
      slider.style.transition = 'none';
      slider.appendChild(firstCard);
      slider.style.transform = `translateX(0px)`;
      isTransitioning = false;
      slider.removeEventListener('transitionend', handleTransition);
    };
    slider.addEventListener('transitionend', handleTransition);
  }

  // --- Функция перехода к предыдущему слайду ---
  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    const lastCard = slider.lastElementChild;
    const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
    const width = lastCard.offsetWidth + gap;

    // Сначала мгновенно переносим последний элемент в начало и сдвигаем ленту
    slider.style.transition = 'none';
    slider.prepend(lastCard);
    slider.style.transform = `translateX(-${width}px)`;

    // Затем плавно возвращаем в 0
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = `translateX(0px)`;
    }, 10);

    slider.addEventListener('transitionend', () => {
      isTransitioning = false;
    }, { once: true });
  }

  // --- Автопрокрутка ---
  let autoScroll = setInterval(nextSlide, 4000);

  // --- Логика мыши (Drag-and-Drop) ---
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.pageX;
    clearInterval(autoScroll);
    slider.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    currentTranslate = currentPosition - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    if (currentTranslate < -100) {
      nextSlide();
    } else if (currentTranslate > 100) {
      prevSlide();
    } else {
      // Возврат на место, если тянули слабо
      slider.style.transition = 'transform 0.3s ease-out';
      slider.style.transform = `translateX(0px)`;
    }

    currentTranslate = 0;
    autoScroll = setInterval(nextSlide, 4000);
  });
});

//---------------------------- Плавный выезд информации
const elements = document.querySelectorAll(
  '.information__text, .information__img'
);

function handleScroll() {
  const triggerTop = window.innerHeight * 0.15;
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom && rect.bottom > triggerTop) {
      el.classList.add('show');
    } else {
      el.classList.remove('show'); // 👈 исчезает
    }
  });
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Animation Footer

document.addEventListener('DOMContentLoaded', () => {
  const footerContainer = document.querySelector('.footer__container');

  const observerOptions = {
    threshold: 0.1 // Спрацює, як тільки 10% футера з'явиться або залишиться на екрані
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footerContainer.classList.add('is-visible');
      } else {
        footerContainer.classList.remove('is-visible'); // Видаляємо клас, коли футер йде з поля зору
      }
    });
  }, observerOptions);

  if (footerContainer) {
    observer.observe(footerContainer);
  }
});

//Mein animation
// function createWaterfall(canvas) {
//   if (!canvas) return; // 🔥 КРИТИЧНО

//   const ctx = canvas.getContext('2d');
//   if (!ctx) return;

//   let drops = [];

//   function resize() {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = window.innerHeight;
//   }

//   window.addEventListener('resize', resize);
//   resize();

//   for (let i = 0; i < 100; i++) {
//     drops.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       speed: 2 + Math.random() * 4,
//       size: Math.random() * 2 + 1,
//       opacity: Math.random()
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drops.forEach(drop => {
//       ctx.fillStyle = `rgba(173,216,230,${drop.opacity})`;
//       ctx.fillRect(drop.x, drop.y, drop.size, drop.size * 5);

//       drop.y += drop.speed;

//       if (drop.y > canvas.height) {
//         drop.y = 0;
//         drop.x = Math.random() * canvas.width;
//       }
//     });

//     requestAnimationFrame(draw);
//   }

//   draw();
// }
// const leftCanvas = document.getElementById('waterfall-left');
// const rightCanvas = document.getElementById('waterfall-right');

// if (leftCanvas) createWaterfall(leftCanvas);
// if (rightCanvas) createWaterfall(rightCanvas);




// function createWaterfall(canvas) {
//   const ctx = canvas.getContext('2d');

//   let drops = [];

//   function resize() {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = window.innerHeight;
//   }

//   window.addEventListener('resize', resize);
//   resize();

//   // создаем капли
//   for (let i = 0; i < 100; i++) {
//     drops.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       speed: 2 + Math.random() * 4,
//       size: Math.random() * 2 + 1,
//       opacity: Math.random()
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drops.forEach(drop => {
//       ctx.beginPath();
//       ctx.fillStyle = `rgba(173,216,230,${drop.opacity})`;
//       ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
//       ctx.fill();

//       drop.y += drop.speed;

//       // "перезапуск" сверху
//       if (drop.y > canvas.height) {
//         drop.y = 0;
//         drop.x = Math.random() * canvas.width;
//       }
//     });

//     requestAnimationFrame(draw);
//   }

//   draw();
// }

// // запуск для двух сторон
// createWaterfall(document.getElementById('waterfall-left'));
// createWaterfall(document.getElementById('waterfall-right'));

//Ball

const ball = document.querySelector('.random-ball');

function moveBall() {
  const x = Math.random() * (window.innerWidth - 300);
  const y = Math.random() * (window.innerHeight - 300);
  
  ball.style.transition = 'all 10s ease-in-out';
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

// Рухаємо кулю кожні 10 секунд
setInterval(moveBall, 10000);
moveBall();

//kursor



//Magnit

const links = document.querySelectorAll('.nav__link');

links.forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const rect = link.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    link.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) scale(1.1)`;
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translate(0,0) scale(1)';
  });
});

const cursor = document.querySelector('.cursor');
const menu = document.querySelector('.menu');

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

menu.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

menu.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

menu.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

function animateCursor() {
  posX += (mouseX - posX) * 0.1;
  posY += (mouseY - posY) * 0.1;

  cursor.style.left = posX + 'px';
  cursor.style.top = posY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();


//language

// document.addEventListener("DOMContentLoaded", function () {

//   console.log("LANG SCRIPT WORKING"); // проверка

//   const translations = {
//     uk: {
//       header_title: "Шиномонтаж",
//       nav_24h: "Цілодобове обслуговування",
//       nav_tow: "Послуги евакуатора",
//       nav_help: "Допомога при поломці",
//       staff_title: "Персонал"
//     },
//     en: {
//       header_title: "Tire Service",
//       nav_24h: "24/7 Service",
//       nav_tow: "Tow Truck Services",
//       nav_help: "Breakdown Assistance",
//       staff_title: "Staff"
//     },
//     de: {
//       header_title: "Reifenservice",
//       nav_24h: "24/7 Service",
//       nav_tow: "Abschleppdienst",
//       nav_help: "Pannenhilfe",
//       staff_title: "Personal"
//     }
//   };

//   function setLanguage(lang) {
//     console.log("SWITCH TO:", lang);

//     document.querySelectorAll("[data-key]").forEach(el => {
//       const key = el.dataset.key;

//       if (!key) return;

//       if (translations[lang] && translations[lang][key]) {
//         el.innerText = translations[lang][key];
//       }
//     });

//     localStorage.setItem("lang", lang);
//   }

//   // обработка кнопок
//   document.querySelectorAll("[data-lang]").forEach(btn => {
//     btn.addEventListener("click", function () {
//       setLanguage(this.dataset.lang);
//     });
//   });

//   // старт
//   const saved = localStorage.getItem("lang") || "uk";
//   setLanguage(saved);

// });

// function createWaterfall(canvas) {
//   if (!canvas) return; // 🔥 КРИТИЧНО

//   const ctx = canvas.getContext('2d');
//   if (!ctx) return;

//   let drops = [];

//   function resize() {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = window.innerHeight;
//   }

//   window.addEventListener('resize', resize);
//   resize();

//   for (let i = 0; i < 100; i++) {
//     drops.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       speed: 2 + Math.random() * 4,
//       size: Math.random() * 2 + 1,
//       opacity: Math.random()
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drops.forEach(drop => {
//       ctx.fillStyle = `rgba(173,216,230,${drop.opacity})`;
//       ctx.fillRect(drop.x, drop.y, drop.size, drop.size * 5);

//       drop.y += drop.speed;

//       if (drop.y > canvas.height) {
//         drop.y = 0;
//         drop.x = Math.random() * canvas.width;
//       }
//     });

//     requestAnimationFrame(draw);
//   }

//   draw();
// }
// const leftCanvas = document.getElementById('waterfall-left');
// const rightCanvas = document.getElementById('waterfall-right');

// if (leftCanvas) createWaterfall(leftCanvas);
// if (rightCanvas) createWaterfall(rightCanvas);


// ================= LANG SYSTEM =================
document.addEventListener("DOMContentLoaded", () => {

  const translations = {
    uk: {
      header_title: "Шиномонтаж",
      nav_24h: "Цілодобове обслуговування",
      nav_tow: "Послуги евакуатора",
      nav_help: "Допомога при поломці",
      staff_title: "Персонал",
      delete: "Утилізація транспортних засобів, що вийшли з експлуатації"
    },
    en: {
      header_title: "Tire Service",
      nav_24h: "24/7 Service",
      nav_tow: "Tow Truck Services",
      nav_help: "Breakdown Assistance",
      staff_title: "Staff",
      delete: "Disposal of end-of-life vehicles"
    },
    de: {
      header_title: "Reifenservice",
      nav_24h: "24/7 Service",
      nav_tow: "Abschleppdienst",
      nav_help: "Pannenhilfe",
      staff_title: "Personal",
      delete: "Entsorgung von Altfahrzeugen"
    }
  };

  function setLanguage(lang) {
    console.log("LANG:", lang);

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.dataset.key;

      if (!key) return;

      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    localStorage.setItem("lang", lang);
  }

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  const savedLang = localStorage.getItem("lang") || "uk";
  setLanguage(savedLang);

});



//language

document.addEventListener("DOMContentLoaded", () => {
  const langCurrent = document.querySelector(".lang-current");
  const langItems = document.querySelectorAll(".lang-list li");

  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedLang = item.getAttribute("data-lang");
      const selectedText = item.innerText;

      // Оновлюємо текст на головній кнопці
      langCurrent.innerText = selectedText;

      // Викликаємо твою існуючу функцію перекладу
      if (typeof setLanguage === "function") {
        setLanguage(selectedLang);
      }
    });
  });

  // Встановлюємо початковий текст при завантаженні
  const savedLang = localStorage.getItem("lang") || "uk";
  const initialItem = Array.from(langItems).find(el => el.dataset.lang === savedLang);
  if (initialItem) {
    langCurrent.innerText = initialItem.innerText;
  }
});

