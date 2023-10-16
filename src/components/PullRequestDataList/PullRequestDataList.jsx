/**
 * This component is responsible to get the pull request data. 
 * This component is parent to PullRequestData component which renders the actual list. 
 * From this component we are passing PR related data like title, id and number to 
 * child component which uses pull request number to get the review and comment count. 
 * 
 */

import React, { useState, useEffect } from 'react';
import { getAllPullRequests } from '../../api/pullRequestService';
import PullRequestData from '../PullRequestData/PullRequestData';
import classes from './PullRequestDataList.module.css'
import { PAGE_SIZE } from '../../constants/utility-constants'; 

const PullRequestDataList = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(null);

  useEffect(() => {
    // GET all the PR's limiting to 10 records per API call
    getAllPullRequests(PAGE_SIZE, null)
    .then(data => {
      setPullRequests(data.nodes);
      setHasNextPage(data.pageInfo.hasNextPage);
      setEndCursor(data.pageInfo.endCursor);
    })
    .catch(error => console.error(error));
  }, []);

  const loadMore = () => {
    if (hasNextPage) {
      // Call the API for the next page with the endCursor
      // Update pullRequests, hasNextPage, and endCursor states
      getAllPullRequests(PAGE_SIZE, endCursor)
      .then(data => {
        setPullRequests([...pullRequests ,...data.nodes]);
        setHasNextPage(data.pageInfo.hasNextPage);
        setEndCursor(data.pageInfo.endCursor);
      })
      .catch(error => console.error(error));
    }
  };

  return (
    <div className={classes.prDataContainer}>
      <h1>Pull Requests ({pullRequests?.length || 0}) </h1>
      <ul className={classes.prULList}>
        {pullRequests.map(pullRequest => {
          return (
            <PullRequestData pullRequest={pullRequest} key={pullRequest.id}/>
        )})}
      </ul>
      <button style={{marginTop: 24}} onClick={() => loadMore()}>Load More..</button>
    </div>
  );
};

export default PullRequestDataList;