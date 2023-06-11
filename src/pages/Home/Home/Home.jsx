// import React from 'react';
// import Banner from './Banner/Banner';
// import PopularInstructors from '../../PopularInstructors/PopularInstructors';
// import PopularClasses from '../../PopularClasses/PopularClasses';
// import FeaturedActivitiesSection from '../../Shared/FeaturedActivitiesSection/FeaturedActivitiesSection';

// const Home = () => {
//     return (
//         <div>
//           <Banner></Banner>
//           <PopularClasses></PopularClasses>
//           <PopularInstructors></PopularInstructors>
//           <FeaturedActivitiesSection></FeaturedActivitiesSection>
          
//         </div>
//     );
// };

// export default Home;

import React, { useState } from 'react';
import Banner from './Banner/Banner';
import PopularInstructors from '../../PopularInstructors/PopularInstructors';
import PopularClasses from '../../PopularClasses/PopularClasses';
import FeaturedActivitiesSection from '../../Shared/FeaturedActivitiesSection/FeaturedActivitiesSection';
import './Home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <div className="theme-toggle">
        <span>Light Theme</span>
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span>Dark Theme</span>
      </div>
      <Banner />
      <PopularClasses />
      <PopularInstructors />
      <FeaturedActivitiesSection isDarkMode={isDarkMode} fluidContainer={isDarkMode} />
    </div>
  );
};

export default Home;
