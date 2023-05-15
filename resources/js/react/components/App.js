import React from 'react';
import ReactDOM from 'react-dom';
import store from '../redux/store';
import Components from "./Components";
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <Components/>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
