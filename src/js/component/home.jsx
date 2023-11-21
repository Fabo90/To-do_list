import React, { useState } from "react";


const Home = () => {
	const [inputValue, setImputValue] = useState("");
	const [list, setList] = useState([]);
	const [style, setStyle] = useState({display: 'none'});
	return (
		<div className="small-middle-container">
			<h1 className="text-center text-secondary display-5">TO-DO LIST</h1>
			<ul class="list-group">
				<input 
				type="text" 
				className="form-control" 
				placeholder="What needs to be done?"
				onChange={(e) => setImputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {
					if (e.key === "Enter" && inputValue != "") {
						setList(list.concat(inputValue));
						setImputValue("");
					} else if (e.key === "Enter" && inputValue == "") {
						alert ("Please write something!");
					};
				}}
				></input>
				<div>
					{list.map((ele, index) => (
						<li className="form-control"
							onMouseOver={() => {
                     			setStyle({display: 'block'});
                 			}}
                 			onMouseLeave={() => {
                     			setStyle({display: 'none'});
                			}}>
							{ele} 
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
