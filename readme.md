# 📝 To-Do List App (with Local Storage)

A simple and practical To-Do List application built with **HTML, CSS, and JavaScript**. This project focuses on core frontend development concepts such as DOM manipulation, event handling, and data persistence using `localStorage`.

---

## 🚀 Features

* ✅ Add new tasks
* ✔️ Mark tasks as completed
* ❌ Delete tasks
* 💾 Save tasks in browser using `localStorage`
* 🔄 Persist tasks after page reload

---

## 🧠 What I Learned

This project helped me strengthen the following skills:

* Dynamic DOM manipulation
* Handling user input with forms
* Managing application state using JavaScript
* Working with arrays of objects
* Using `localStorage` to persist data
* Writing cleaner and more organized code

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)

---

## 📂 Project Structure

```
📁 todo-list-app
│── index.html
│── style.css
│── script.js
│── resources/
```

---

## ⚙️ How It Works

* Tasks are stored as an array of objects:

```js
{
  id: number,
  text: string,
  completed: boolean
}
```

* When a task is added:

  * It is pushed into the array
  * The UI is updated
  * Data is saved to `localStorage`

* When the page loads:

  * Tasks are retrieved from `localStorage`
  * The list is rendered again

---

## 📸 Screenshots

![alt text]({615D1919-56E7-47A7-BEC1-E336C9C015E2}.png)
![alt text]({2EBF1400-8903-4316-9ABE-10CC435EC57D}.png)
![alt text]({EC6DF3B2-0836-48BC-8E9E-3EF43AADCB4C}.png)
![alt text]({134C9B60-CF1D-4E57-8D6D-D67233864C29}.png)
![alt text]({750D2357-4588-4501-B0CB-80E2444F1DA3}.png)
![alt text]({522E33C8-61C0-4EDB-92B4-F1C7AAA20164}.png)
---

## 📌 Future Improvements

* ✏️ Edit tasks
* 🎨 Improve UI/UX design
* 🌙 Dark mode
* 📅 Add due dates

---

## 🧪 How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/KaliGix/TodoList-App.git
```

2. Open the project folder
3. Run `index.html` in your browser

---

## 📖 Lessons & Reflection

This project represents a key step in my journey as a frontend developer. It goes beyond a simple UI by introducing real-world concepts like state management and data persistence.

---

## 📎 Repository

https://github.com/KaliGix/TodoList-App.git

---

## 🙌 Author

Created by **Kali** as part of a frontend development learning path.
