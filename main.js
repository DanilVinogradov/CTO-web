
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
function createWaterfall(canvas) {
  const ctx = canvas.getContext('2d');

  let drops = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // создаем капли
  for (let i = 0; i < 100; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 2 + Math.random() * 4,
      size: Math.random() * 2 + 1,
      opacity: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach(drop => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(173,216,230,${drop.opacity})`;
      ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      ctx.fill();

      drop.y += drop.speed;

      // "перезапуск" сверху
      if (drop.y > canvas.height) {
        drop.y = 0;
        drop.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// запуск для двух сторон
createWaterfall(document.getElementById('waterfall-left'));
createWaterfall(document.getElementById('waterfall-right'));

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

const trail = document.querySelector('.cursor-trail');
let isMoving = false; // Прапорець для запобігання зайвим діям

function moveTrail(e) {
  if (isMoving) return; // Якщо ми вже в русі, нічого не робимо
  
  isMoving = true; // Позначаємо, що ми в русі
  
  trail.style.transition = 'all 0.1s ease-out'; // Дуже швидка та плавна transition
  trail.style.left = `${e.clientX}px`; // Переміщуємо слід до курсору
  trail.style.top = `${e.clientY}px`; // І трохи вище/нижче
  
  // Чим швидше ти рухаєш курсором, тим яскравішим стає слід
  const speed = Math.min(1.5, (Math.abs(e.movementX) + Math.abs(e.movementY)) / 100);
  trail.style.filter = `blur(${speed * 5}px) brightness(${100 + speed * 50}%)`;
  
  // Після руху скидаємо прапорець, щоб дозволити наступну дію
  setTimeout(() => {
    isMoving = false;
  }, 100); // Час затримки має збігатися з часом transition
}

// Слухаємо рух курсору
window.addEventListener('mousemove', moveTrail);

// Показуємо слід, коли курсор на сторінці
window.addEventListener('mouseenter', () => {
  trail.style.display = 'block';
});

// Приховуємо слід, коли курсор залишає сторінку
window.addEventListener('mouseleave', () => {
  trail.style.display = 'none';
});