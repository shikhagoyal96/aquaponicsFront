import React from 'react';
import Layout from './Layout';
import HeroSection from './HeroSection';
import ProductCards from './productsList/ProductCards';
import ServicesCards from './servicesList/ServicesCards';
import Footer from '../footer/Footer';

function Home() {
    return (
        <>     
            <Layout 
                title="METCHOSIN AQUAPONICS INC. - 60 Days Seedling to the Table" 
                description="" 
            >
                {/* <HeroSection /> */}
                <ProductCards />
                <ServicesCards />
                <Footer/>
            </Layout>
        </>
    );
}

export default Home;