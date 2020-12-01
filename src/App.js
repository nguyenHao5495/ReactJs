import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ContactForm from './pages/contactForm';
import ListContact from './pages/listUser';
import './App.scss';
function App() {
  return (
    <Router>
      <div>

        <Route path="/contact" component={ContactForm} />
        <Route path="/listUser" component={ListContact} />
      </div>
    </Router>
  );
}

export default App;
