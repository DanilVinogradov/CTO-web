import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYKb0W3sARVfJ_NzIFAIzKXYw5yU2xH6Q",
    authDomain: "cto-project-7d9b2.firebaseapp.com",
    databaseURL: "https://cto-project-7d9b2-default-rtdb.firebaseio.com", 
    projectId: "cto-project-7d9b2",
    storageBucket: "cto-project-7d9b2.firebasestorage.app",
    messagingSenderId: "86348237196",
    appId: "1:86348237196:web:6df1fedbded4ca1b972ea9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ordersRef = ref(db, 'orders/');

let currentOrderId = null;

document.addEventListener("DOMContentLoaded", () => {
    const ordersBody = document.getElementById('admin-orders-body');
    const modal = document.getElementById('assign-modal');
    const saveBtn = document.getElementById('save-appointment'); // НАША КНОПКА
    const timeInput = document.getElementById('appointment-time');

    // Перевірка пароля
    const pass = prompt("Введіть пароль:");
    if (pass !== "1234") {
        window.location.href = "index.html";
        return;
    }

    // Завантаження даних
    onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (!ordersBody) return;
        ordersBody.innerHTML = ""; 

        if (data) {
            let ordersArray = Object.entries(data).map(([id, values]) => ({ id, ...values }));

            // Сортування: спочатку ті, де призначено час
            ordersArray.sort((a, b) => {
                if (a.appointment && b.appointment) return new Date(a.appointment) - new Date(b.appointment);
                if (a.appointment) return -1;
                if (b.appointment) return 1;
                return new Date(b.date) - new Date(a.date);
            });

            ordersArray.forEach((order) => {
                const row = document.createElement('tr');
                const timeInfo = order.appointment 
                    ? `<br><span style="color:#00ff88; font-size: 0.8em;">📅 ${new Date(order.appointment).toLocaleString()}</span>` 
                    : '';

                row.innerHTML = `
                    <td>${order.date || '---'}</td>
                    <td>${order.name || '---'}</td>
                    <td><a href="tel:${order.phone}" class="phone-link">${order.phone || '---'}</a></td>
                    <td>${order.car || '---'}</td>
                    <td>${order.issue || '---'}${timeInfo}</td>
                    <td>
                        <button class="btn-assign" data-id="${order.id}">ЧАС</button>
                        <button class="btn-delete" data-id="${order.id}">❌</button>
                    </td>
                `;
                ordersBody.appendChild(row);
            });

            // Навішуємо події на кнопки в таблиці
            document.querySelectorAll('.btn-assign').forEach(btn => {
                btn.onclick = () => {
                    currentOrderId = btn.dataset.id;
                    modal.style.display = 'block';
                    console.log("Обрано ID:", currentOrderId);
                };
            });

            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.onclick = () => {
                    if (confirm("Видалити?")) remove(ref(db, `orders/${btn.dataset.id}`));
                };
            });
        }
    });

    // ГОЛОВНЕ: Обробка натискання на ПІДТВЕРДИТИ
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const timeValue = timeInput.value;
            console.log("Кнопка натиснута. Час:", timeValue, "ID:", currentOrderId);

            if (!currentOrderId) {
                alert("Помилка: Не обрано замовлення!");
                return;
            }

            if (!timeValue) {
                alert("Оберіть дату та час!");
                return;
            }

            // Оновлення в Firebase
            update(ref(db, `orders/${currentOrderId}`), {
                appointment: timeValue
            })
            .then(() => {
                console.log("Збережено в Firebase!");
                modal.style.display = 'none';
                timeInput.value = ""; // Очистити поле
            })
            .catch((err) => {
                console.error("Помилка запису:", err);
                alert("Помилка бази даних!");
            });
        });
    } else {
        console.error("КНОПКА save-appointment НЕ ЗНАЙДЕНА В HTML!");
    }

    // Закриття модалки
    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
});