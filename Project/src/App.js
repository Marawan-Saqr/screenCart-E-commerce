import { Provider } from "react-redux";
import store from './Redux/store.js';
import Router from './Router.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;