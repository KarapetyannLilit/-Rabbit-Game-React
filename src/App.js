import './App.css';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import BoardUi from './components/BoardUi';

function App() {
  return (
    <div className="App">
      <Main/>
      {/* <BoardUi/> */}
    </div>
  );
}

export default App;
