import './App.css';
import Header from './components/Header/header';
import Buscador from './components/Buscador/buscador';

function App() {
  return (
    //Esto es simplemente para que se vea como quederon los componentes, en caso de necesitarlo, se pueden cargar/quitar
    //los componentes en el div
    <div className="App">
      <Header />
      <Buscador />
{/*       <Footer />
      <TarjetaObjetivo />
      <TarjetaMacros />
      <IngestaAgua />
      <GraficaPeso />
      <GraficaPulsasiones /> */}
    </div>
  );
}

export default App;
