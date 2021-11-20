import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";

import {Home, Comics} from '../pages'
 
const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<Home/>}/>    
                        <Route path='/comics' element={<Comics/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;