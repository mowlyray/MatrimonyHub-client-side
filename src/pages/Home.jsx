import React from 'react';
import Banner from '../components/Banner';
import PremiumMembers from '../components/PremiumMembers';
import HowItWorks from '../components/HowItWorks';
import SuccessCounter from '../components/SuccessCounter';



const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PremiumMembers></PremiumMembers>
           <HowItWorks></HowItWorks>
           <SuccessCounter></SuccessCounter>
           
        </div>
    );
};

export default Home;