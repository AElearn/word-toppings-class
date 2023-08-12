import { Button, Form, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import matchData from "../part2.json";

const MatchGame = (props) => {
	const { lesson, setStage } = props;
	const matchInfo = matchData[lesson];

	const [showNextStageButton, setShowNextStageButton] = useState(false);

	const [selectedOptions, setSelectedOptions] = useState({});

	const handleOptionChange = (groupIndex, optionValue) => {
		setSelectedOptions((prevSelectedOptions) => ({
			...prevSelectedOptions,
			[groupIndex]: optionValue,
		}));
	};

	const onSubmit = () => {
		const answers = matchInfo.answer;
		for (let i = 0; i < answers.length; i++) {
			if (answers[i] !== selectedOptions[i]) {
				return;
			}
		}
		setShowNextStageButton(true);
	};

	return (
		<>
			<div className="text-center p-2 blue font-bold">
				<h6>Please fill in the blanks with the following words.</h6>
			</div>
			<div className="text-left reading">
				{matchInfo.questions.map((question, index) => {
					return (
						<div key={index}>
							<span>
								{index + 1}. {question}
							</span>
							<br />
							<br />
							<Form>
								<div key={`inline-radio`} className="mb-3">
									{matchInfo.words.map((word, index2) => {
										return (
											<Form.Check
												inline
												disabled={showNextStageButton}
												key={index2}
												label={word}
												value={word}
												name="group1"
												type="radio"
												id={`inline-${index}-${word}`}
												checked={selectedOptions[index] === word}
												onChange={() => handleOptionChange(index, word)}
											/>
										);
									})}
								</div>
							</Form>
						</div>
					);
				})}
			</div>
			<div className="text-center">
				{!showNextStageButton && (
					<Button
						disabled={
							Object.keys(selectedOptions).length != matchInfo.questions.length
						}
						className="align-middle d-inline-flex p-2"
						onClick={() => onSubmit()}
					>
						Submit
					</Button>
				)}
				{showNextStageButton && (
					<Button variant="success" onClick={() => setStage(3)}>
						NEXT STAGE
					</Button>
				)}
			</div>
		</>
	);
};

export default MatchGame;
