import React, { useEffect, useState } from "react";


const Home = () => {
	const [inputValue, setImputValue] = useState("");
	const [list, setList] = useState([]);
	const [style, setStyle] = useState({display: 'none'});

  
	async function api () {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian");
		const json = await response.json();
		console.log(json);
		setList(json);
	};

	async function add () {
		const upTask = [{
			label: inputValue,
			done: false
		  }];

		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/fabian", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(upTask)
		});
		const json = await response.json();
		console.log(json);
	};


  useEffect(() => {
	api()
  }, [])




	return (
		<div className="small-middle-container">
			<h1 className="text-center text-secondary display-5">TO-DO LIST</h1>
			<ul className="list-group">
				<input 
				type="text" 
				className="form-control" 
				placeholder="What needs to be done?"
				onChange={(e) => setImputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {
					if (e.key === "Enter" && inputValue != "") {
						add();
						setImputValue("");
					} else if (e.key === "Enter" && inputValue == "") {
						alert ("Please write something!");
					};
				}}
				></input>
				<div>
					{list.map((ele, index) => (
						<li key={index} 
							className="form-control"
							onMouseOver={() => {
                     			setStyle({display: 'block'});
                 			}}
                 			onMouseLeave={() => {
                     			setStyle({display: 'none'});
                			}}>
							{ele.label} 
							<button className="btn-close float-end"
									onClick={() =>
										setList(list.filter((i, ind) => index != ind))}
									style={style}
							></button>
						</li>
					))}
				</div>
			</ul>
			<div> 
				{list.length == "" ? "Nothing to do, please add something to the list..." : list.length + " tasks"}
			</div>
		</div>	
	);
};
export default Home;
