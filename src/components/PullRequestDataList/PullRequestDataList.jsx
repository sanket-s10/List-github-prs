import React, { useState, useEffect } from 'react';
import { getAllPullRequests, getPullRequests } from '../../api/pullRequestService';
import PullRequestData from '../PullRequestData/PullRequestData';
import classes from './PullRequestDataList.module.css'

const PullRequestDataList = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(null);

  useEffect(() => {
    getAllPullRequests(10, null)
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
      getAllPullRequests(10, endCursor)
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
      <ul>
        {pullRequests.map(pullRequest => {
          return (
            <PullRequestData pullRequest={pullRequest} key={pullRequest.id}/>
        )})}
      </ul>
      <button onClick={() => loadMore()}>Load More..</button>
    </div>
  );
};

export default PullRequestDataList;