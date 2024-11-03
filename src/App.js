import { Provider } from "react-redux";
import store from './Redux/store.js';
import Routing from './Routing.jsx';

function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;