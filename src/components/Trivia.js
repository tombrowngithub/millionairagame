import React from "react";
import {useRef} from 'react';
import useSound from 'use-sound';
import play from '../assets/play.mp3'
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'

export default function Trivia(props) {
    //Initializing the variable I get from the `Trivia` which is in `App` component
    const data = props.data
    const setStop = props.setStop
    const questionNumber = props.questionNumber
    const setQuestionNumber = props.setQuestionNumber

    const [classCorrect, setClassCorrect] = React.useState("answer")
    const [questions, setQuestions] = React.useState(null) // handle question from the `data`
    const [selectedAnswer, setSelectedAnswer] = React.useState(null)
    const [className, setClassName] = React.useState("answer") //get the className to change the color base on the condition if the answer is right or wrong
    const processing = useRef(false);

    //const [letPlay] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)


    React.useEffect(() => {
        //letPlay()
        setQuestions(data[questionNumber - 1])
    }, [data, questionNumber]) //each time the data and question changes, display the

    const answerElements = questions?.answers.map((element, key) => {
        return (
            <div key={key}
                 className={selectedAnswer === element ? className : (element.correct ? classCorrect : "answer")}
                 onClick={() => handleClick(element)}>{element.text}
            </div>
        )
    })


    //Function that hold timer and the content to do when after the time elapse
    function delayTimer(duration, callback) {
        setTimeout(() => {
            callback()
        }, duration)
    }

    function handleClick(ElementOfTheClickedButton) {
        if (processing.current) return;
        processing.current = true;
        setTimeout(() => {
            processing.current = false;
        }, 5000);


        setSelectedAnswer(ElementOfTheClickedButton) // set the item option clicked as `selectedAnswer`
        setClassName("answer active")
        //setClassName("my-correct")
        //setClassCorrect("my-correct")

        delayTimer(3000, setClassName(ElementOfTheClickedButton.correct ? "answer correct" : "answer wrong"))
        //delayTimer(3000, )
        delayTimer(1000, () => {
            if (ElementOfTheClickedButton.correct) {
                correctAnswer()
                delayTimer(1000, () => {
                    if (questionNumber === 15) {
                        setStop(true)
                    }
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer(null)
                })

            } else {
                wrongAnswer()
                setClassCorrect("my-correct")
                delayTimer(2000, () => {
                    setStop(true)
                })
            }

        })
    }

    return (
        <div className="trivia">
            <div className="question">{questions?.question}</div>
            {/*..Questions..*/}
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}
