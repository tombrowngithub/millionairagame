import React from "react";
import "./style.css"
import Trivia from "./components/Trivia";
import data from "./data";
import Timer from "./components/Timer";
import Confetti from 'react-confetti'

export default function App() {
    const [questionNumber, setQuestionNumber] = React.useState(1)
    const [stop, setStop] = React.useState(false)
    const [earned, setEarned] = React.useState("$ 0")

    const moneyPyramid = React.useMemo(() =>
            [
                {id: 1, amount: "$ 100"},
                {id: 2, amount: "$ 200"},
                {id: 3, amount: "$ 300"},
                {id: 4, amount: "$ 500"},
                {id: 5, amount: "$ 1000"},
                {id: 6, amount: "$ 2000"},
                {id: 7, amount: "$ 4000"},
                {id: 8, amount: "$ 8000"},
                {id: 9, amount: "$ 16000"},
                {id: 10, amount: "$ 32000"},
                {id: 11, amount: "$ 64000"},
                {id: 12, amount: "$ 125000"},
                {id: 13, amount: "$ 250000"},
                {id: 14, amount: "$ 500000"},
                {id: 15, amount: "$ 1000000"},
            ],
        [])


    //Looping through the prices and displaying the amount and number
    const ListItemElement = moneyPyramid.map((item, id) => (
        <li key={id}
            className={questionNumber === item.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{item.id}</span>
            <span className="moneyListItemAmount">{item.amount}</span>
        </li>
    )).reverse()

    React.useEffect(() => {
        questionNumber > 1 &&
        setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
    }, [moneyPyramid, questionNumber])

    function TopBottomElement() {
        return (
            <>
                <div className="top">
                    <div className="timer">
                        <Timer
                            setStop={setStop}
                            questionNumber={questionNumber}
                        />
                    </div>
                </div>

                <div className="bottom">
                    <Trivia
                        data={data}
                        setStop={setStop}
                        setQuestionNumber={setQuestionNumber}
                        questionNumber={questionNumber}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="lockScreen">
                <div>
                    <h2>Please enter landscape mode</h2>
                </div>
            </div>

            <div className="App">
                <div className="main">
                    {questionNumber === 15+1 && <Confetti/>}
                    {stop ? <h1 className="earnedText">You earned: {earned}</h1> : TopBottomElement()}
                </div>


                <div className="pyramid">
                    <ul className="moneyList">
                        {ListItemElement}
                    </ul>
                </div>
            </div>
        </>
    );
}

