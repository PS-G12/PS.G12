

import TarjetaMacros from '../../components/TarjetaMacros/tarjetaMacros';
import Header from '../../components/Header/header';
import TarjetaObjetivo from '../../components/TarjetaObjetivo/tarjetaObjetivo';
import IngestaAgua from '../../components/IngestaAgua/ingestaAgua';
import GraficaPulsasiones from '../../components/GraficaPulsaciones/graficaPulsasiones';
import GraficaPeso from '../../components/GraficaPeso/graficaPeso';


const indexPage = () => {
    
    return (
      <div className="index-page">
        <Header />
        <TarjetaObjetivo />
        <TarjetaMacros/>
        <IngestaAgua/>
        <IngestaAgua/>
        <GraficaPulsasiones/>
        <GraficaPeso/>
      </div>
    );
  };
  
  export default indexPage;