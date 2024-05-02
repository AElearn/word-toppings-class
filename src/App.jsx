import {
	Nav,
	NavDropdown,
	Navbar,
	Container,
	Button,
	Form,
	ListGroup,
} from "react-bootstrap";
import "./App.css";
import wordsData from "./words.json";
import React, { useState, useEffect } from "react";
import RootGame from "./components/RootGame";
import MatchGame from "./components/MatchGame";
import ReadingGame from "./components/ReadingGame";

const App = () => {
	// Change this to the right lesson per week
	const [lesson, setLesson] = useState(1);
	const [expanded, setExpanded] = useState(false);

	/*
  1. Root game
  2. Part 2 game
  3. Part 3 game
  */
	const [stage, setStage] = useState(1);

	useEffect(() => {
		document.title = "Word Sandwich";
	});

	return (
		<>
			<Navbar expanded={expanded} bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="">
						Word Sandwich - Lesson {lesson + 1}
					</Navbar.Brand>
					<Navbar.Toggle
						onClick={() => setExpanded(!expanded)}
						aria-controls="basic-navbar-nav"
					/>
					{/* <Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{wordsData.roots.map((element, index) => {
								return (
									<NavDropdown.Item
										key={index}
										onClick={() => {
											setLesson(index);
											if (stage == 0) {
												setStage(1);
											} else {
												setStage(0);
											}
											setExpanded(false);
										}}
									>
										Lesson {index + 1}
									</NavDropdown.Item>
								);
							})}
							// .filter((element, index) => index === lesson)} 
						</Nav>
					</Navbar.Collapse> */}
				</Container>
			</Navbar>
			{stage == 0 && <RootGame lesson={lesson} setStage={setStage} />}
			{stage == 1 && <RootGame lesson={lesson} setStage={setStage} />}
			{stage == 2 && <MatchGame lesson={lesson} setStage={setStage} />}
			{stage == 3 && <ReadingGame lesson={lesson} setStage={setStage} />}
		</>
	);
};

export default App;
