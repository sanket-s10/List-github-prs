/**
 * 
 * This is component which will hold all the components that are needed to display 
 * for the home page.
 */

import React, { useState, useEffect } from 'react';
import PullRequestDataList from '../../components/PullRequestDataList/PullRequestDataList';

const HomePage = () => {
  return (
    <div>
        <PullRequestDataList />
    </div>
  );
};

export default HomePage;