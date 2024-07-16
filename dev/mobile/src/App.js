import logo from './logo.svg';
import PageManager from './pages/index.js';
import Header from './components/Header.js';
import Pivot from './components/pivot-bar.js';
import './App.css';

function App() {
  return (<>
    <Header />
    <PageManager></PageManager>
    <Pivot />
  </>);
}

export default App;