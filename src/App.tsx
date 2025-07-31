import Header from './components/Header';
import TableComponent from './components/DataTable';
import './App.css';

// Import PrimeReact CSS
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <>
      <Header />
      <TableComponent />
    </>
  );
}

export default App
