
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

// запуск для двух сторон
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


 //language

 document.addEventListener("DOMContentLoaded", () => {

const translations = {
    uk: {
      header_title: "Шиномонтаж",
      nav_24h: "Цілодобове обслуговування",
      nav_tow: "Послуги евакуатора",
      nav_help: "Допомога при поломці",
      delete: "Утилізація транспортних засобів",

      staff_title: "Персонал",

      h_title: "Допомога при поломці",
      title2: "У компанії Towing Service 1 ми розуміємо, що поломки непередбачувані і можуть статися будь-якої миті. Саме тому ми пропонуємо професійну допомогу при поломках цілодобово, щоб ви могли швидко повернутися на дорогу, де б і коли вам знадобилася допомога. \n\n Наші послуги з надання допомоги при поломках включають: \n\n",
      
      pos1_info: "Послуги евакуатора",
      pos2_info: "Ласкаво просимо до Towing Service 1, вашої надійної служби евакуації автомобілів, що надає професійну допомогу на дорозі. Ми розуміємо, що поломки та аварії можуть статися у будь-який час та в будь-якому місці. Саме тому ми тут, щоб надати вам швидку та ефективну допомогу, коли вона вам найбільше потрібна. \n\n До переліку наших послуг входять: \n\n\n",
      pos3_info: "-Евакуація після ДТП: Ми спеціалізуємося на безпечній евакуації та буксируванні транспортних засобів після дорожньо-транспортних пригод. Наші досвідчені водії працюють акуратно та професійно, щоб мінімізувати збитки.",
      pos4_info: "-Допомога при поломці : будь то розряджений акумулятор, спущена шина або інші проблеми з автомобілем, ми маємо необхідні інструменти та навички, щоб швидко повернути вас на дорогу.",
      pos5_info: "-Транспортування транспортних засобів: Ми пропонуємо надійне транспортування всіх типів транспортних засобів, від легкових автомобілів до важких комерційних автомобілів. Ваш автомобіль буде доставлений в цілості та безпеці і точно вчасно.",
      pos6_info: "-Евакуація несправних транспортних засобів: Якщо ваш автомобіль більше не придатний для експлуатації на дорогах, ви можете розраховувати на наше безпечне транспортування та, при необхідності, на рекомендації щодо ремонту або технічного обслуговування.",
      pos7_info: "Ми пишаємося нашим чудовим обслуговуванням клієнтів та швидкою реакцією. Наша досвідчена команда фахівців з евакуації автомобілів доступна цілодобово, щоб допомогти вам у скрутну хвилину. \n\n Незалежно від того, перебуваєте ви в надзвичайній ситуації або плануєте безпечне транспортування свого автомобіля, ми — ваш надійний партнер. Ваше задоволення та безпека – наш головний пріоритет. \n\n Зв'яжіться з нами, якщо вам потрібні наші послуги. Ми завжди готові надати вам допомогу та підтримку, на які ви заслуговуєте. \n\n\n\n",

      h1_info: "-Послуга запуску двигуна від зовнішнього джерела живлення: Якщо ваш автомобіль не заводиться через розряджений акумулятор, наші досвідчені фахівці готові допомогти вам запустити двигун і швидко повернути вас на дорогу.",
      h2_info: "-Прокол шини: Прокол шини може раптово зірвати ваші плани. Ми пропонуємо швидку заміну та ремонт шин, щоб ви могли безпечно повернутися на дорогу",
      h3_info: "-Наші висококваліфіковані фахівці з ремонту автомобілів навчені діяти спокійно та професійно у надзвичайних ситуаціях. Достатньо просто зателефонувати, і ми завжди готові швидко та ефективно вам допомогти.",
      h4_info: "Наша мета - надати вам негайну допомогу у скрутну хвилину і забезпечити ваше безпечне повернення за кермо. Ваше задоволення та безпека – наш головний пріоритет.",
      h5_info: "Зв'яжіться з нами сьогодні, якщо вам потрібна допомога на дорозі. Ми пишаємося тим, що доступні цілодобово та без вихідних, щоб надати вам необхідну допомогу та підтримку. \n\n\n",

      d1_info: "Утилизация транспортных средств, \n вышедших из эксплуатации",
      d2_info: "У компанії Towing Service 1 ми серйозно ставимося до своєї відповідальності перед навколишнім середовищем і пропонуємо вам екологічне рішення щодо утилізації автомобілів , що відслужили свій термін . Ми прагнемо мінімізувати вплив автомобілів, що відслужили свій термін, на довкілля, забезпечуючи при цьому безпечний і відповідальний процес утилізації. \n\n Наші послуги з утилізації транспортних засобів, що вийшли з експлуатації, включають:",
      d3_info: "-Екологічно безпечна утилізація: Ми розбираємо та утилізуємо старі автомобілі екологічно безпечним способом, забезпечуючи належне поводження з небезпечними речовинами та повторне використання матеріалів, що переробляються.",
      d4_info: "-Переробка відходів: Ми максимально використовуємо повторно та переробляємо автомобільні деталі та матеріали, щоб скоротити кількість відходів та зберегти ресурси навколишнього середовища.",
      d5_info: "Документація : Ми надаємо вам усі необхідні документи та підтвердження для належної утилізації транспортних засобів, що відслужили свій термін, відповідно до вимог законодавства.",
      d6_info: "Збір та транспортування: Наша команда забере ваш старий автомобіль і безпечно доставить його на наш майданчик для утилізації, щоб весь процес пройшов для вас без зайвого клопоту.",
      d7_info: "Ми пишаємося тим, що вносимо свій внесок у скорочення впливу на навколишнє середовище, забезпечуючи належну утилізацію та переробку автомобілів, що відслужили свій термін. Наша прихильність до захисту навколишнього середовища та сталого розвитку є невід'ємною частиною нашого бізнесу. \n\n Зв'яжіться з нами сьогодні, якщо хочете довірити утилізацію вашого автомобіля відповідальним рукам, що відслужив свій термін. Ми гарантуємо, що ваш автомобіль буде утилізований екологічно безпечним та належним чином. \n\n Адаптуйте текст з урахуванням специфіки послуг вашої компанії з утилізації транспортних засобів, що відслужили свій термін, і переконайтеся, що в ньому підкреслюється ваша прихильність до екологічної відповідальності. \n\n\n\n",

      // Персонал
      p1_name: "Георгій",
      p1_info: "Експерт із 15-річним стажем. Спеціалізується на капітальному ремонті двигунів будь-якої складності та системному аналізі вузлів.",
      p1_role: "Головний механік",

      p2_name: "Олександр",
      p2_info: "Майстер з налаштування підвіски та гальмівних систем. Гарантує ідеальну керованість та безпеку вашого авто на дорозі.",
      p2_role: "Майстер ходовий",

      p3_name: "Дмитро",
      p3_info: "Профі у пошуку «невидимих» несправностей. Працює із сучасними бортовими комп'ютерами та складною електронікою.",
      p3_role: "Автоелектрик",

      p4_name: "Артем",
      p4_info: "Швидке та якісне технічне обслуговування: заміна олій, фільтрів та повна діагностика перед покупкою чи поїздкою.",
      p4_role: "Фахівець з ТО",

      p5_name: "Ігор",
      p5_info: "Професіонал у роботі з дисками та гумою. Ідеальне балансування та ремонт проколів з використанням топового обладнання.",
      p5_role: "Шиномонтаж",

      p6_name: "Максим",
      p6_info: "Організує робочий процес та допоможе підібрати запчастини. Завжди на зв'язку, щоб проконсультувати вас за вартістю та термінами.",
      p6_role: "Менеджер",

      // Блоки
      block1_title: "Найкраща служба евакуації автомобілів",
      block1_text: "Наші професійні послуги евакуації доступні в регіоні та забезпечать вам надійну та ефективну підтримку у разі поломки або проблем з автомобілем.",
      call: "Набрати номер",

      block2_title: "Діагностика несправностей та ремонт усіх легкових автомобілів.",
      block2_text: `-допомога при поломці автомобіля \n
                    -Спеціальне обладнання \n
                    -Поряд з вами`,

      block3_title: "Діагностика несправностей та ремонт усіх автомобілів.",
      block3_text: "-Двигуни, трансмісії, стартери, генератори \n-Електричні системи, пневматика \n-Паливні та водяні насоси \n-Підвіска, гальмівні системи",

      // Footer
      about: "Про нас",
      about_text: "Ми команда професіоналів, закоханих в автомобілі. Наше СТО пропонує повний спектр послуг: від планової заміни олії до складного ремонту двигуна та електроніки. Використовуємо тільки сучасне обладнання та перевірені запчастини, щоб ви відчували себе у безпеці на будь-якій дорозі.",
      contacts: "Контакти",
      phone: "Телефон",
      address: "Адреса"
    },

    en: {
      header_title: "Tire Service",
      nav_24h: "24/7 Service",
      nav_tow: "Tow Truck Services",
      nav_help: "Breakdown Assistance",
      delete: "Vehicle Disposal",

      h_title: "Breakdown assistance",
      title2: "At Towing Service 1, we understand that breakdowns are unpredictable and can happen at any time. That's why we offer professional breakdown assistance 24/7 so you can get back on the road quickly, wherever and whenever you need help. \n\n Our breakdown assistance services include: \n\n",

      staff_title: "Staff",

      pos1_info: "Tow truck services",
      pos2_info: "Welcome to Towing Service 1, your trusted car towing service that provides professional roadside assistance. We understand that breakdowns and accidents can happen at any time and anywhere. That's why we are here to provide you with fast and efficient assistance when you need it most. \n\n Our services include: \n\n\n",
      pos3_info: "-Accident Recovery: We specialize in the safe recovery and towing of vehicles after traffic accidents. Our experienced drivers work carefully and professionally to minimize damage.",
      pos4_info: "-Breakdown Assistance: Whether it's a dead battery, flat tire, or other vehicle issues, we have the tools and skills to get you back on the road quickly.",
      pos5_info: "-Vehicle Transportation: We offer reliable transportation of all types of vehicles, from passenger cars to heavy commercial vehicles. Your vehicle will be delivered intact and safe and on time.",
      pos6_info: "-Evacuation of faulty vehicles: If your vehicle is no longer roadworthy, you can count on our safe transportation and, if necessary, recommendations for repairs or maintenance.",
      pos7_info: "We pride ourselves on our excellent customer service and fast response times. Our experienced team of car towing specialists is available 24/7 to help you in your time of need. \n\n Whether you are in an emergency or planning to safely transport your car, we are your trusted partner. Your satisfaction and safety are our top priority. \n\n Contact us if you need our services. We are always ready to provide you with the help and support you deserve. \n\n\n",

      h1_info: "-Jump-start service: If your car won't start due to a dead battery, our experienced technicians are ready to help you jump-start your engine and get you back on the road quickly.",
      h2_info: "-Puncture: A puncture can suddenly derail your plans. We offer quick tire replacement and repair so you can get back on the road safely.",
      h3_info: "-Our highly trained auto repair specialists are trained to act calmly and professionally in emergency situations. Just give us a call and we are always ready to help you quickly and efficiently.",
      h4_info: "Our goal is to provide you with immediate assistance in your time of need and ensure your safe return to the wheel. Your satisfaction and safety are our top priority.",
      h5_info: "Contact us today if you need roadside assistance. We pride ourselves on being available 24/7 to provide you with the help and support you need. \n\n\n",

      d1_info: "Disposal of vehicles that are out of service",
      d2_info: "At Towing Service 1, we take our environmental responsibility seriously and offer you an environmentally friendly solution for end-of-life vehicle disposal. We strive to minimize the environmental impact of end-of-life vehicles while ensuring a safe and responsible disposal process. \n\n Our end-of-life vehicle disposal services include:",
      d3_info: "-Environmentally friendly disposal: We dismantle and dispose of old cars in an environmentally friendly manner, ensuring proper handling of hazardous substances and reuse of recyclable materials.",
      d4_info: "-Waste recycling: We reuse and recycle automotive parts and materials as much as possible to reduce waste and conserve environmental resources.",
      d5_info: "Documentation: We provide you with all the necessary documents and confirmations for the proper disposal of end-of-life vehicles in accordance with legal requirements.",
      d6_info: "Collection and transportation: Our team will collect your old car and deliver it safely to our disposal site, making the entire process hassle-free for you.",
      d7_info: "We are proud to contribute to reducing our environmental impact by ensuring proper disposal and recycling of end-of-life vehicles. Our commitment to environmental protection and sustainability is an integral part of our business. \n\n Contact us today if you would like to entrust the disposal of your end-of-life vehicle to responsible hands. We guarantee that your vehicle will be disposed of in an environmentally friendly and proper manner. \n\n Adapt the text to the specifics of your end-of-life vehicle disposal service and make sure it highlights your commitment to environmental responsibility. \n\n\n\n",
      
      p1_name: "George",
      p1_info: "An expert with 15 years of experience. Specializes in overhauling engines of any complexity and system analysis of components.",
      p1_role: "Chief Mechanic",

      p2_name: "Alexander",
      p2_info: "A master in tuning suspension and brake systems. Guarantees perfect handling and safety of your car on the road.",
      p2_role: "Chassis Master",

      p3_name: "Dmitry",
      p3_info: "A pro at finding invisible faults. Works with modern on-board computers and complex electronics.",
      p3_role: "Auto Electrician",

      p4_name: "Artem",
      p4_info: "Fast and high-quality maintenance: oil and filter changes and full diagnostics before purchase or trip.",
      p4_role: "Service Specialist",

      p5_name: "Igor",
      p5_info: "Professional in working with wheels and tires. Perfect balancing and puncture repair using top-of-the-line equipment.",
      p5_role: "Tire Service",

      p6_name: "Maxim",
      p6_info: "Will organize the work process and help you choose spare parts. Always in touch to advise you on cost and terms.",
      p6_role: "Manager",

      block1_title: "Best Car Towing Service",
      block1_text: "Our professional towing services are available in the region and will provide you with reliable and efficient support in the event of a breakdown or problems with your car.",
      call: "Call now",

      block2_title: "Fault diagnosis and repair of all passenger cars.",
      block2_text: "- assistance in case of car breakdown \n- Special equipment \n- Near you",

      block3_title: "Fault diagnosis and repair of all vehicles.",
      block3_text: "-Engines, transmissions, starters, generators \n-Electrical systems, pneumatics \n-Fuel and water pumps \n-Suspension, brake systems",

      about: "About Us",
      about_text: "We are a team of professionals who are in love with cars. Our service station offers a full range of services: from scheduled oil changes to complex engine and electronics repairs. We use only modern equipment and proven spare parts so that you feel safe on any road.",
      contacts: "Contacts",
      phone: "Phone",
      address: "Address"
    },

    de: {
      header_title: "Reifenservice",
      nav_24h: "24/7 Service",
      nav_tow: "Abschleppdienst",
      nav_help: "Pannenhilfe",
      delete: "Fahrzeugentsorgung",

      h_title: "Pannenhilfe",
      title2: "Wir von Abschleppdienst 1 wissen, dass Pannen unvorhersehbar sind und jederzeit passieren können. Deshalb bieten wir Ihnen rund um die Uhr professionelle Pannenhilfe, damit Sie schnell wieder mobil sind – egal wo und wann Sie Hilfe benötigen. \n\n Unsere Pannenhilfeleistungen umfassen: \n\n",

      staff_title: "Personal",
      h1_info: "-Starthilfe: Sollte Ihr Auto aufgrund einer leeren Batterie nicht anspringen, helfen Ihnen unsere erfahrenen Techniker gerne beim Starthilfegeben und sorgen dafür, dass Sie schnell wieder unterwegs sind.",
      h2_info: "Reifenpanne: Eine Reifenpanne kann Ihre Pläne plötzlich durchkreuzen. Wir bieten schnellen Reifenwechsel und Reparaturen an, damit Sie sicher wieder unterwegs sind.",
      h3_info: "Unsere bestens ausgebildeten Kfz-Reparaturspezialisten sind darauf geschult, in Notfällen ruhig und professionell zu handeln. Rufen Sie uns einfach an – wir helfen Ihnen schnell und effizient.",
      h4_info: "Unser Ziel ist es, Ihnen in Ihrer Notlage umgehend zu helfen und Ihre sichere Rückkehr ans Steuer zu gewährleisten. Ihre Zufriedenheit und Sicherheit stehen für uns an erster Stelle.",
      h5_info: "Kontaktieren Sie uns noch heute, wenn Sie Pannenhilfe benötigen. Wir sind stolz darauf, Ihnen rund um die Uhr zur Verfügung zu stehen und Ihnen die benötigte Hilfe und Unterstützung zu bieten.",

      pos1_info: "Abschleppdienst",
    pos2_info: "Willkommen bei Towing Service 1, Ihrem zuverlässigen Abschleppdienst für professionelle Pannenhilfe. Wir wissen, dass Pannen und Unfälle jederzeit und überall passieren können. Deshalb sind wir für Sie da, um Ihnen schnelle und effiziente Hilfe zu leisten, wenn Sie sie am dringendsten benötigen. \n\n Zu unserem Leistungsspektrum gehören: \n\n\n",
    pos3_info: "-Unfallbergung: Wir sind auf die sichere Bergung und das Abschleppen von Fahrzeugen nach Verkehrsunfällen spezialisiert. Unsere erfahrenen Fahrer arbeiten sorgfältig und professionell, um weitere Schäden zu minimieren.",
    pos4_info: "-Pannenhilfe: Ob eine leere Batterie, ein platter Reifen oder andere Fahrzeugprobleme – wir verfügen über die notwendigen Werkzeuge und Fachkenntnisse, um Sie schnell wieder mobil zu machen.",
    pos5_info: "-Fahrzeugtransport: Wir bieten den zuverlässigen Transport aller Fahrzeugtypen an, vom PKW bis hin zu schweren Nutzfahrzeugen. Ihr Fahrzeug wird sicher, unversehrt und pünktlich an sein Ziel geliefert.",
    pos6_info: "-Abschleppen defekter Fahrzeuge: Wenn Ihr Fahrzeug nicht mehr fahrbereit ist, können Sie sich auf unseren sicheren Transport verlassen. Bei Bedarf geben wir Ihnen gerne Empfehlungen für Reparaturen oder Wartungen.",
    pos7_info: "Wir sind stolz auf unseren exzellenten Kundenservice und unsere schnellen Reaktionszeiten. Unser erfahrenes Team von Abschleppspezialisten steht Ihnen rund um die Uhr zur Verfügung, um Ihnen in schwierigen Situationen zu helfen. \n\n Egal, ob Sie sich in einer Notsituation befinden oder einen sicheren Transport Ihres Fahrzeugs planen, wir sind Ihr zuverlässiger Partner. Ihre Zufriedenheit und Sicherheit haben für uns oberste Priorität. \n\n Kontaktieren Sie uns, wenn Sie unsere Dienste benötigen. Wir sind jederzeit bereit, Ihnen die Hilfe und Unterstützung zu bieten, die Sie verdienen. \n\n\n\n",

      d1_info: "Entsorgung von außer Betrieb genommenen Fahrzeugen",
      d2_info: "Wir von Towing Service 1 nehmen unsere Umweltverantwortung ernst und bieten Ihnen eine umweltfreundliche Lösung für die Entsorgung Ihres Altfahrzeugs. \n\n Wir sind bestrebt, die Umweltauswirkungen von Altfahrzeugen zu minimieren und gleichzeitig einen sicheren und verantwortungsvollen Entsorgungsprozess zu gewährleisten. \n\n Unsere Dienstleistungen im Bereich der Altfahrzeugentsorgung umfassen:",
      d3_info: "-Umweltfreundliche Entsorgung: Wir demontieren und entsorgen alte Autos umweltschonend und gewährleisten dabei den ordnungsgemäßen Umgang mit Gefahrstoffen und die Wiederverwendung von Wertstoffen.",
      d4_info: "-Abfallrecycling: Wir verwenden und recyceln Autoteile und -materialien so weit wie möglich, um Abfall zu reduzieren und Umweltressourcen zu schonen.",
      d5_info: "Dokumentation: Wir stellen Ihnen alle notwendigen Dokumente und Bestätigungen für die ordnungsgemäße Entsorgung von Altfahrzeugen gemäß den gesetzlichen Bestimmungen zur Verfügung.",
      d6_info: "Abholung und Transport: Unser Team holt Ihr altes Auto ab und liefert es sicher zu unserer Entsorgungsanlage. So ist der gesamte Vorgang für Sie völlig unkompliziert.",
      d7_info: "Wir sind stolz darauf, unseren Beitrag zur Reduzierung der Umweltbelastung zu leisten, indem wir die fachgerechte Entsorgung und das Recycling von Altfahrzeugen sicherstellen. \n\n Unser Engagement für Umweltschutz und Nachhaltigkeit ist ein fester Bestandteil unseres Unternehmenskonzpts. \n\n Kontaktieren Sie uns noch heute, wenn Sie die Entsorgung Ihres Altfahrzeugs in verantwortungsvolle Hände geben möchten. \n\n Wir garantieren Ihnen, dass Ihr Fahrzeug umweltgerecht und ordnungsgemäß verwertet wird.",

      p1_name: "Georg",
      p1_info: "Ein Experte mit 15 Jahren Erfahrung. Spezialisiert auf die Überholung von Motoren jeder Komplexität und die Systemanalyse von Komponenten.",
      p1_role: "Chefmechaniker",

      p2_name: "Alexander",
      p2_info: "Ein Meister in der Abstimmung von Fahrwerks- und Bremssystemen. Garantiert perfektes Fahrverhalten und maximale Sicherheit Ihres Fahrzeugs im Straßenverkehr.",
      p2_role: "Fahrwerksmeister",

      p3_name: "Dmitri",
      p3_info: "Ein Profi im Aufspüren „unsichtbarer“ Fehler. Arbeitet mit modernen Bordcomputern und komplexer Elektronik.",
      p3_role: "Autoelektriker",

      p4_name: "Artem",
      p4_info: "Schnelle und hochwertige Wartung: Öl- und Filterwechsel sowie vollständige Diagnose vor Kauf oder Reise.",
      p4_role: "Service Spezialist",

      p5_name: "Igor",
      p5_info: "Professionell im Umgang mit Rädern und Reifen. Perfektes Auswuchten und Reparieren von Reifenpannen mit modernster Ausrüstung.",
      p5_role: "Reifenservice",

      p6_name: "Maxim",
      p6_info: "Wir organisieren den Arbeitsablauf und helfen Ihnen bei der Auswahl der Ersatzteile. Wir bleiben stets in Kontakt, um Sie über Kosten und Konditionen zu informieren.",
      p6_role: "Manager",

      block1_title: "Beste Abschleppdienste",
      block1_text: "Unser professioneller Abschleppdienst steht Ihnen in der Region zur Verfügung und bietet Ihnen im Falle einer Panne oder anderer Probleme mit Ihrem Fahrzeug zuverlässige und effiziente Unterstützung.",
      call: "Anrufen",

      block2_title: "Fehlerdiagnose und Reparatur aller Pkw.",
      block2_text: "- Hilfe bei einer Autopanne \n- Spezialausrüstung \n- In Ihrer Nähe",

      block3_title: "Fehlerdiagnose und Reparatur aller Fahrzeuge.",
      block3_text: "-Motoren, Getriebe, Anlasser, Generatoren\n-Elektrische Systeme, Pneumatik\n-Kraftstoff- und Wasserpumpen\n-Federung, Bremssysteme",

      about: "Über uns",
      about_text: "Wir sind ein Team von Autoprofis mit Leidenschaft für Fahrzeuge. Unsere Werkstatt bietet Ihnen ein umfassendes Leistungsspektrum: vom planmäßigen Ölwechsel bis hin zu komplexen Motor- und Elektronikreparaturen. Wir verwenden ausschließlich moderne Ausrüstung und bewährte Ersatzteile, damit Sie sich auf jeder Straße sicher fühlen.",
      contacts: "Kontakte",
      phone: "Telefon",
      address: "Adresse"
    }
  };


function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[lang] && translations[lang][key]) {
      
      // Заменяем обычные переносы строк из JS на тег <br> для HTML
      const formattedText = translations[lang][key].replace(/\n/g, '<br>');
      
      el.innerHTML = formattedText; // Используем innerHTML
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

document.addEventListener("DOMContentLoaded", () => {
  const langCurrent = document.querySelector(".lang-current");
  const langItems = document.querySelectorAll(".lang-list li");

  // Функція для оновлення видимого тексту на кнопці
  function updateDropdownText(langCode) {
    const activeItem = Array.from(langItems).find(el => el.dataset.lang === langCode);
    if (activeItem) {
      langCurrent.innerText = activeItem.innerText;
    }
  }

  // Обробка кліку по мові в списку
  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedLang = item.getAttribute("data-lang");
      
      // 1. Змінюємо текст у головній кнопці
      updateDropdownText(selectedLang);

      // 2. Викликаємо твою основну функцію перекладу
      setLanguage(selectedLang);
    });
  });

  // Логіка при завантаженні сторінки
  const savedLang = localStorage.getItem("lang") || "uk";
  setLanguage(savedLang); // Твоя функція перекладу
  updateDropdownText(savedLang); // Оновлюємо вигляд кнопки
});

// Твоя існуюча функція перекладу (переконайся, що вона виглядає так)
function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[lang] && translations[lang][key]) {
      // Замінюємо \n на <br> для коректного відображення переносів
      const formattedText = translations[lang][key].replace(/\n/g, '<br>');
      el.innerHTML = formattedText;
    }
  });
  localStorage.setItem("lang", lang);
}