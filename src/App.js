import './App.css';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  // const dispatch = useDispatch();
  // const cash = useSelector(state => state.cash.cash)
  // const addCash = (cash) => {
  //   dispatch({
  //     type: "ADD_CASH",
  //     payload: cash
  //   })
  // }
  // const getCash = (cash) => {
  //   dispatch({
  //     type: "ADD_CASH",
  //     payload: cash
  //   })
  // }

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
