import styles from "./App.module.css";
import React, { useState } from "react"
import { ReactComponent as DeleteIcon } from "./public/delete-icon.svg"
import { ReactComponent as EditIcon } from "./public/edit-icon.svg"


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
		<div className={styles["container"]}>
			<div className={styles["main-container"]}>
				<h1>
					The Todo List
				</h1>
				<h2>
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
				<ul className={styles["list"]}>
					{todoItems.map((item, index) => {
						return (
							<li key={index}
								onClick={() => handleDeleteItem(index)}>
								<p className={styles["list__item-text"]}>
									{item}
								</p>
								<EditIcon className={styles["list__icon-edit"]} />
								<DeleteIcon className={styles["list__icon-delete"]} />
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default App;
