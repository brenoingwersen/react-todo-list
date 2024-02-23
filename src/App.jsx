import './App.css';
import React, { useState } from "react"
import styles from "./index.css"


function App() {
	// List of todo items
	const [todoItems, setItems] = useState([
		"Walk the dog",
		"Go to the gym",
		"Study React"
	]);

	// Task text
	const [itemTask, setItemTask] = useState("");

	// Create new todo item
	function handleAddItem(event) {
		// Creates a new item only when there's a task
		if (itemTask !== "") {
			setItems((i) => [...i, itemTask]);

			// Remove the filled item task after adding it to the list
			setItemTask("");
		};
	};

	// Capture the text typed into the input tag
	function handleTaskChange(event) {
		setItemTask((t) => event.target.value);
	};

	// Delete an item
	function handleDeleteItem(index) {
		setItems((i) => {
			return i.filter((_, idx) => idx !== index);
		});
	};

	return (
		<div className={styles["main-container"]}>
			<h1 className={styles["main-header"]}>
				The Todo List
			</h1>
			<h2 className={styles["sub-header"]}>
				A simple React Todo List App
			</h2>
			<p>New Todo</p>
			<input
				type="text"
				placeholder="Todo Item"
				onChange={handleTaskChange}
				value={itemTask}
			/>
			<button onClick={handleAddItem}>
				Add Todo
			</button>

			<p>My List</p>
			<ul id="itemsList">
				{todoItems.map((item, index) => {
					return (
						<li key={index}
							onClick={() => handleDeleteItem(index)}>
							{item}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default App;
