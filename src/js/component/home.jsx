import React, { useEffect, useState } from "react";


const Home = () => {
	const [inputValue, setImputValue] = useState("");
	const [list, setList] = useState([]);
	const [style, setStyle] = useState({display: 'none'});

	async function newList () {
		
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body:JSON.stringify([])
			});
			const json = await response.json();

			if (!response.ok) {
				console.log(response.statusText);
				return;
			}

			console.log(json);
			
		} catch (error) {
			console.log(error);
		}
	};

	async function getApi () {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian");
			const json = await response.json();

			if (!response.ok) {
				console.log(response.statusText);
				return;
			}

			setList(json);
			console.log(json);
		} catch(error) {
			console.log(error);
		}
	};

	async function addTask () {
		list.push({
			label: inputValue,
			done: false
		  });
		
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian", {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(list)
			});
			const json = await response.json();

			if (!response.ok) {
				console.log(response.statusText);
				return;
			}

			console.log(json);
			
		} catch (error) {
			console.log(error);
		}
	};

	async function deleteList () {	
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian", {
				method: 'DELETE'
			});
			const json = await response.json();

			if (!response.ok) {
				console.log(response.statusText);
				return;
			}

			console.log(json);
			
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		getApi()
	}, [])

	
	return (
		<div className="small-middle-container">
			<h1 className="text-center text-secondary display-5">TO-DO LIST</h1>
			<button className="btn btn-success container-fluid" 
					onClick={() => {newList(); setStyle({display: 'block'})}}
					>Click to create a new list.</button>
			<ul className="list-group" style={style}>
				<input 
				type="text" 
				className="form-control" 
				placeholder="What needs to be done?"
				onChange={(e) => setImputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {
					if (e.key === "Enter" && inputValue != "") {
						addTask();
						setImputValue("");
					} else if (e.key === "Enter" && inputValue == "") {
						alert ("Please write something!");
					};
				}}
				></input>
				<div>
					{list.map((ele, index) => (
						<li key={index} className="form-control">
							{ele.label} 
						</li>
					))}
				</div>
			</ul>
			<div style={style}> 
				{list.length == "" ? "Nothing to do, please add something to the list..." : list.length + " tasks"}
			</div>
			<button className="btn btn-danger container-fluid" 
					onClick={() => {deleteList(); setStyle({display: 'none'}); window.alert("For a new list please reload the page.")}}>
					Delete list.</button>
		</div>	
	);
};
export default Home;
