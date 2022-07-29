import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss' 
import { BrowserRouter} from 'react-router-dom';
import MyRouter from './components/my-router/MyRouter';

function App() {
    
    return (
        <BrowserRouter>
            <MyRouter/>
        </BrowserRouter>
    )
}

export default App;
