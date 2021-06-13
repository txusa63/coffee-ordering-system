// import logo from './logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootswatch/dist/simplex/bootstrap.min.css";
import './App.css';
import { Header } from './components/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { Form } from './components/Form';
import { FormerSales } from './components/FormerSales';
import { Delete } from './components/Delete';
import { SaleInformation } from './components/SaleInformation';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/create' component={Form} />
          <Route path='/sales/:id' component={SaleInformation} />
          <Route path='/sales' component={FormerSales} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
