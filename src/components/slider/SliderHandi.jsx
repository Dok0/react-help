import React from 'react';

import item from '../../assets/data/item';

const SliderHandi = (props) => {

    const data = props.data;
      return (
        <section className="tf-section technology" id=''>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="block-text center">
                        <h3 className="title mb-28" data-aos="fade-up" data-aos-duration="1000">{data.title}</h3>
                            <h5 className="sub-title mb-10" data-aos="fade-up" data-aos-duration="1000">{data.subtitle}</h5>         
                        </div>
                    </div>
                </div>
                <div className="row mt-53">
                    <div className="col-xl-6 col-md-12">
                        <div className="row text-center">
                        {
                            data.info.map((data) => (

                                    <div key={''+ data.id} className="col-12 mt-2">
                                       { data.title!==undefined && <h4> {data.title} </h4> } 
                                       { data.subtitle!==undefined && <p> {data.subtitle}</p> }
                                    </div>
                            ))
                        }   
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="group-image">
                            <img src={item.handi} alt="Monteno" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      );
    }

export default SliderHandi;