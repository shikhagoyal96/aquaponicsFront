import React from 'react';
//import Layout from './Layout';
import HeroSection from './herosection/HeroSection';
import ProductCards from './productsList/ProductCards';
import ServicesCards from './servicesList/ServicesCards';

function Home() {
    return (
        <>     
            {/* <Layout title="Aquaponics" description="Hello..." 
            style={{
                
            }}> */}
                <HeroSection />
                <ProductCards />
                <ServicesCards />
            {/* </Layout> */}
        </>
    );
}

export default Home;