

import Header from '../../components/Header/header';
/* import IngestaAgua from '../../components/WaterConsumption/waterConsumption';
import GraficaPulsasiones from '../../components/PulseGraph/pulseGraph';
import WeightGraph from '../../components/WeightGraph/weightGraph'; */
import ObjectiveCard from '../../components/ObjectiveCard/ObjectiveCard';
import MacrosCard from '../../components/MacrosCard/macrosCard';
import Footer from '../../components/Footer/footer';
import './homePage.css'

const indexPage = () => {
    
    return (
      <div className="index-page">
        <Header />
        <div className="cards">
          <ObjectiveCard value={(1500/2542)*100} kcalObjective={2542} food={0} exercise={0} remaining={1500} />
          <MacrosCard value={81} max={165} value2={50} max2={65} value3={32} max3={85}/>
        </div>

{/*         <IngestaAgua/>
        <IngestaAgua/>
        <GraficaPulsasiones/>
        <GraficaPeso/> */}
      <Footer />
      </div>
    );
  };
  
  export default indexPage;