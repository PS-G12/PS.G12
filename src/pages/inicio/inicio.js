

import Header from '../../components/Header/header';
import IngestaAgua from '../../components/IngestaAgua/ingestaAgua';
import GraficaPulsasiones from '../../components/GraficaPulsaciones/graficaPulsasiones';
import GraficaPeso from '../../components/GraficaPeso/graficaPeso';
import {TarjetaObjetivo, TarjetaMacros} from '../../components/Tarjeta/tarjeta';


const indexPage = () => {
    
    return (
      <div className="index-page">
        <Header />
        <TarjetaObjetivo />
        <TarjetaMacros />
{/*         <IngestaAgua/>
        <IngestaAgua/>
        <GraficaPulsasiones/>
        <GraficaPeso/> */}
      </div>
    );
  };
  
  export default indexPage;