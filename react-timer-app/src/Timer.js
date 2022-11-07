import {Component} from "react"

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            sec: 0,
            min: props.time,
            step: props.step,
            autostart: props.autostart,
            onTick: props.onTick,
            isStarted: false,
            timerWidth: 500,
            changedTimerWidth:  (500 / (props.time * 60)) * (props.step / 1000),
            onTimeStart: props.onTimeStart,
            onTimePause: props.onTimePause,
            onTimeEnd: props.onTimeEnd,
        };
    };

    componentDidMount() {
        const { autostart } = this.state;      
            if(autostart === true) {
            this.timerStarts();           
        };   
    };

    componentDidUpdate(){
        this.state.onTick(this.state.min, this.state.sec);
    };

    componentWillUnmount() {
        clearInterval(this.Interval);

        const { autostart } = this.state;

        if (autostart === true) {
          this.isStarted = !this.isStarted;
        }
    };

    timerStarts = () => {
        this.isStarted = !this.isStarted;

        if(this.isStarted) {
            this.state.onTimeStart();       
            this.Interval = setInterval(() => {
                const { sec, min, step, timerWidth, changedTimerWidth, id } = this.state;
            
                this.setState(({ timerWidth }) => ({
                    timerWidth: (timerWidth - changedTimerWidth)                
                }))
                document.querySelector(`#${id} .line`).style.width = timerWidth - changedTimerWidth + "px";
           
                if (sec > 0) {
                    this.setState(({ sec }) => ({
                        sec: step < 1000 ? (sec - (step / 1000)).toFixed(1) : (sec - (step / 1000))
                    }));          
                };

                if (sec === 0) {
                    if (min === 0) {
                        clearInterval(this.Interval);  
                        this.state.onTimeEnd();  
                        this.isStarted = !this.isStarted;                    
                    } else {
                        this.setState(({min}) => ({
                            min: min - 1,
                            sec: 60 - (step / 1000)
                        }));
                    };
                }          
            }, this.state.step)
        } else {
            clearInterval(this.Interval)
            this.state.onTimePause(); 
        };         
    };

    render() {        
        const { min, sec, id } = this.state;
        return (
            <div className="timer" id = {id}>
                <h1> {min} : {sec < 10 ? `0${sec}` : sec} </h1>
                <div className="timer_line">
                    <div className="line"></div>
                </div>
                <button onClick = {this.timerStarts}>Start / Pause</button>
            </div>
        )
    };
};

export default Timer;