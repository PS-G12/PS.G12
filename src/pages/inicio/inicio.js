

import Header from '../../components/Header/header';
import IngestaAgua from '../../components/IngestaAgua/ingestaAgua';
import GraficaPulsasiones from '../../components/GraficaPulsaciones/graficaPulsasiones';
import GraficaPeso from '../../components/GraficaPeso/graficaPeso';
import TarjetaObjetivo from '../../components/TarjetaObjetivo/tarjetaObjetivo';
import TarjetaMacros from '../../components/TarjetaMacros/tarjetaMacros';
import './inicio.css'

const indexPage = () => {
    
    return (
      <div className="index-page">
        <Header />
        <div className="cards">
          <TarjetaObjetivo value={(1500/2542)*100} objetivoKcal={2542} alimento={0} ejercicio={0} restantes={1500} />
          <TarjetaMacros value={81} max={165} value2={50} max2={65} value3={32} max3={85}/>
        </div>

{/*         <IngestaAgua/>
        <IngestaAgua/>
        <GraficaPulsasiones/>
        <GraficaPeso/> */}
      </div>
    );
  };
  
  export default indexPage;