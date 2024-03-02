import './App.css';
import Header from './components/header';

function App() {
  return (
    //Esto es simplemente para que se vea como quederon los componentes, en caso de necesitarlo, se pueden cargar/quitar
    //los componentes en el div
    <div className="App">
      <Header />
      <Footer />
      <TarjetaObjetivo />
      <TarjetaMacros />
      <IngestaAgua />
      <GraficaPeso />
      <GraficaPulsasiones />
    </div>
  );
}

export default App;