import React, { useState, useEffect } from 'react';
import { fetchPullRequestData } from '../../api/pullRequestService';
import classes from './PullRequestData.module.css';
import CommentIcon from '../../assets/comment-icon.svg'

const PullRequestData = ({ pullRequest }) => {
    const { id, title } = pullRequest;
    const [prDetails, setPrDetails] = useState(null);
    useEffect(() => {
        if (pullRequest) {
            fetchPullRequestData(pullRequest.number)
                .then(data => {
                    const conversationCount = (data?.comments?.totalCount || 0) + (data?.reviews?.totalCount || 0);
                    setPrDetails({
                        reviewCommentsCount: conversationCount,
                        author: data?.author
                    });
                })
                .catch(error => {
                    console.error(error);
                    setPrDetails({
                        reviewCommentsCount: 0
                    });
                });
        }
    }, [pullRequest])

    if (prDetails === null) {
        return <li key={id} className={classes.prListContainer}> Loading... </li>
    };

    return (
        <li key={id} className={classes.prListContainer}>
            <div className={classes.prListTitleContainer}>
                <span className={classes.prTitle}> {title} </span>
                <span className={classes.commentIconContainer}> 
                    <img className={classes.commentSVG} src={CommentIcon}/>
                    {prDetails?.reviewCommentsCount || 0}</span>
            </div>
            <span>Opened by <i>{prDetails?.author?.login || ""}</i></span>
        </li>
    );
};

export default PullRequestData;