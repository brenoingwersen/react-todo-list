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
				<h1> The Todo List </h1>
				<h2> A simple React Todo List App </h2>
				<hr />
				<h3>New Todo</h3>
				<input
					type="text"
					placeholder="Todo Item"
					onChange={handleTaskChange}
					value={itemTask}
				/>
				<button onClick={handleAddItem}>
					Add Todo
				</button>

				<h3>My List</h3>
				<ul className={styles["list"]}>
					{todoItems.map((item, index) => {
						return (
							<li key={index}
								className={styles["list__item"]}>

								<input className={styles["list__item-input"]} value={item}/>

								<div className={styles["list__icons"]}>
									<EditIcon className={styles["list__icon-edit"]} />
									<DeleteIcon
										className={styles["list__icon-delete"]}
										onClick={() => handleDeleteItem(index)}
									/>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default App;
