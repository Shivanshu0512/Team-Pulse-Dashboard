import { Provider } from 'react-redux';
import { store } from './redux/store';
// @ts-ignore
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;