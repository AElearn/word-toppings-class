import { Button, Form, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import readingData from "../part3.json";

const ReadingGame = (props) => {
	const { lesson, setStage } = props;
	const matchInfo = readingData[lesson];

	const [showNextStageButton, setShowNextStageButton] = useState(false);

	const [selectedOptions, setSelectedOptions] = useState({});

	const handleOptionChange = (groupIndex, optionValue) => {
		setSelectedOptions((prevSelectedOptions) => ({
			...prevSelectedOptions,
			[groupIndex]: optionValue,
		}));
	};

	const onSubmit = () => {
		for (let i = 0; i < matchInfo.questions.length; i++) {
			if (matchInfo.questions[i].answer !== selectedOptions[i]) {
				return;
			}
		}
		setShowNextStageButton(true);
	};

	return (
		<>
			<div className="text-center blue font-bold">
				<br />
				<h6>Reading comprehension</h6>
			</div>
			<div className="reading">
				<span>{matchInfo.reading}</span>
			</div>

			<div className="text-left reading">
				{matchInfo.questions.map((questionSet, index) => {
					return (
						<div key={index}>
							<span>
								{index + 1}. {questionSet.question}
							</span>
							<br />
							<br />
							<Form>
								<div key={`inline-radio`} className="mb-3">
									{questionSet.choices.map((choice, index2) => {
										return (
											<Form.Check
												disabled={showNextStageButton}
												key={index2}
												label={choice}
												value={index2}
												name="group1"
												type="radio"
												id={`inline-${index}-${index2}`}
												checked={selectedOptions[index] === index2}
												onChange={() => handleOptionChange(index, index2)}
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
				{showNextStageButton && <h6 className="green">🎉 ALL CORRECT 🎉</h6>}
			</div>
		</>
	);
};

export default ReadingGame;
