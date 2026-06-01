import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}
