import styles from "./App.module.css";
import React, { useState, useEffect } from "react"
import { ReactComponent as DeleteIcon } from "./public/delete-icon.svg"
import { ReactComponent as EditIcon } from "./public/edit-icon.svg"


function App() {
	// List of todo items
	const [todoItems, setItems] = useState([
		{ itemInput: "Walk the dog", isComplete: false },
		{ itemInput: "Go to the gym", isComplete: false },
		{ itemInput: "Study React", isComplete: false }
	]);

	// Task text
	const [itemTask, setItemTask] = useState("");

	// Editing item
	const [editItemIndex, setEditItemIndex] = useState(null);

	// Create new todo item
	function handleAddItem(event) {
		// Creates a new item only when there's a task
		if (itemTask !== "") {
			setItems((i) => [...i, { itemInput: itemTask, isComplete: false }]);

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

	// Edit an item
	function handleEditItem(index) {
		setEditItemIndex(index);
		// Checks if the item was complete
		setItems(todoItems.map((item, idx) => {
			if (idx === index) {
				return { ...item, isComplete: false }
			};
			return item;
		}))
	}

	// Handles the prompting of text from editing an item
	function handleEditItemText(event, index) {
		setItems(todoItems.map((item, idx) => {
			return {
				...item,
				itemInput: index === idx ? event.target.value : item.itemInput
			}
		}))
	};

	// Handles the toggling of an item as complete or not
	function handleCompleteItem(index) {
		setItems(todoItems.map((item, idx) => {
			if (idx === index) {
				// If the item was complete then it'll be reversed
				return { ...item, isComplete: !item.isComplete }
			};
			return item
		}))
	};

	// Create an useEffect hook to track the editItemIndex value
	// and set event listeneres throughout the document to check
	// if the user has clicked elsewhere and set the editItemIndex
	// back to null and stop the item edition
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target.tagName !== "INPUT" ||
				event.target.classList.contains("form-input")) {
				setEditItemIndex(null);
			}
		};
		if (editItemIndex !== null) {
			document.addEventListener("mousedown", handleClickOutside);
		};
		// Cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		};
	}, [editItemIndex]);

	return (
		<div className={styles["container"]}>
			<div className={styles["main-container"]}>
				<h1> The Todo List </h1>
				<h2> A simple React Todo List App </h2>
				<hr />
				<h3>New Todo</h3>
				<input className="form-input"
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
								className={styles["list__item"]}
								style={editItemIndex === index ? { borderWidth: "3px" } : {}}
							>
								<div className={styles["item__input-container"]}>

									<input className={styles["list__item-input"]}
										value={item["itemInput"]}
										onChange={(event) => handleEditItemText(event, index)}
										style={item["isComplete"] ? { textDecoration: "line-through" } : {}}
										disabled={editItemIndex !== index}
									/>

									<div className={styles["input-overlay"]}
										onClick={() => handleCompleteItem(index)}
										style={editItemIndex === index ? { display: "none" } : {}}
									></div>
								</div>

								<div className={styles["list__icons"]}>
									<EditIcon
										className={styles["list__icon-edit"]}
										onClick={() => handleEditItem(index)}
									/>

									<DeleteIcon
										className={styles["list__icon-delete"]}
										onClick={() => handleDeleteItem(index)}
									/>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	)
}

export default App;
