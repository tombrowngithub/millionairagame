import  {useEffect, useState} from "react";

export default function Timer(props) {
    const [timer, setTimer] = useState(30)// initialize time to 30 seconds

    useEffect(() => {
        if (timer === 0) return props.setStop(true)//stop the game when timer is 0, by changing the useState in `App` component to true.
        const interval = setInterval(() => {
            setTimer(timer - 1)  //reduce the time by 1
        }, 1000)// at every 1 second
        return () => clearInterval(interval) //clear the old time
    }, [props, props.setStop, timer]);

    //this effect reset the time to 30 seconds after every new question
    useEffect(() => {
        setTimer(60)
    }, [props.questionNumber])

    return timer;
}
