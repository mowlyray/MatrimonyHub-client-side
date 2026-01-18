import React from 'react';
import Banner from '../Banner/Banner';
import PremiumMembers from '../PremiumMembers/PremiumMembers';
import HowItWorks from '../HowItWorks/HowItWorks';
import SuccessCounter from '../SuccessCounter/SuccessCounter';
import SuccessStories from '../successStory/SuccessStroies';



const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PremiumMembers></PremiumMembers>
           <HowItWorks></HowItWorks>
           <SuccessCounter></SuccessCounter>
           <SuccessStories></SuccessStories>
        </div>
    );
};

export default Home;