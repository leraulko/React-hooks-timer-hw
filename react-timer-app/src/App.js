import './App.css';
import Timer from './Timer';


function App() {
  return (
    <div className="App">
      <Timer 
        id = { 'first_timer' }
        time = { 1 }
        step = { 1000 }
        autostart = { true }
        onTick = {(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
        onTimeStart={() => console.log("Таймер запущено!")}
        onTimePause={() => console.log("Таймер на паузі!")}
        onTimeEnd={() => console.log("Час вийшов!")}
      />

      <Timer 
        id = { 'second_timer' }
        time = { 2 }
        step = { 2000 }
        autostart = { false }
        onTick = {(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
        onTimeStart={() => console.log("Таймер запущено!")}
        onTimePause={() => console.log("Таймер на паузі!")}
        onTimeEnd={() => console.log("Час вийшов!")}
      />
    </div>
  );
}

export default App;
