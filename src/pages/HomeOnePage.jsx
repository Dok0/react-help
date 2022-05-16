import React from 'react';
import dataRoadMap from '../assets/data/data-roadmap';
import dataTeam from '../assets/data/data-team';
import dataSliderHandi from '../assets/data/data-slider-handi';
import Footer from '../components/footer/Footer';
import HeaderOnePage from '../components/header/HeaderOnePage'
import AboutTwo from '../components/layouts/AboutTwo';
import RoadMap2 from '../components/layouts/RoadMap2';
import Team from '../components/layouts/Team';
import SliderHandi from '../components/slider/SliderHandi';

const HomeOnePage = () => {
  return (
    <div className='one-page'>
        <HeaderOnePage/>
        <SliderHandi data={dataSliderHandi} />
        <AboutTwo/>
        <Team data={dataTeam} />
        <RoadMap2 data={dataRoadMap} />
        <Footer/>
    </div>
  );
}

export default HomeOnePage;