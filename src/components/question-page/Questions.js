import React, { useEffect } from 'react';
import { Typography, Card } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from './store/actions';
import SkeletonLoading from '../skeleton-loading/skeletonLoading';
import { convertTimestamp } from '../profile/Profile';

export function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

const Questions = () => {

    const dispatch = useDispatch();
    const featuredQuestions = useSelector(state => state.questions.question.featuredQuestions);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch])

    if (!featuredQuestions) {
        return (
            <SkeletonLoading />
        )
    }

    return (
        <div>
            <Typography variant={'h5'} className="question-heading"> Top Questions [Featured]</Typography><br />
            {
                featuredQuestions && featuredQuestions.items.map(questionItem => {
                    return (
                        <Card key={questionItem.question_id} className='questionCard'>

                            <div className="question-summary narrow" id="question-summary-67335684">
                                <div className="cp">
                                    <div className="votes">
                                        <div className="mini-counts"><span title={questionItem.score + "votes"}>{questionItem.score}</span></div>
                                        <div>votes</div>
                                    </div>

                                    <div className={questionItem.is_answered ? "status answered-accepted" : "status unanswered"}>
                                        <div className="mini-counts"><span title={questionItem.answer_count + "answers"}>{questionItem.answer_count}</span></div>
                                        <div>answers</div>
                                    </div>

                                    <div className="views">
                                        <div className="mini-counts"><span title={questionItem.view_count + "views"} > {questionItem.view_count}</span></div>
                                        <div>views</div>
                                    </div>

                                </div>
                                <div className="summary">

                                    {
                                        questionItem.bounty_amount &&
                                        <span className="bounty">{'+' + questionItem.bounty_amount}</span>
                                    }
                                    <h3><a href={questionItem.link} className="question-hyperlink">{questionItem.title}</a></h3>
                                    <div className="subcommunities float-left">

                                    </div>
                                    <div className="tags t-android t-android-mediacodec">
                                        {
                                            questionItem.tags.map(tag => (
                                                <a key={tag} href={() => false} className="post-tag" title="" rel="tag">{tag}</a>
                                            ))
                                        }
                                    </div>
                                    <div className="started">
                                        <a href={() => false} className="started-link">
                                            {(questionItem.is_answered ? 'answered ' : 'modified ') +
                                                convertTimestamp(questionItem.last_activity_date) + " "}</a>
                                        <a href={"/user-profile/" + questionItem.owner['user_id']}>{questionItem.owner['display_name']}</a>
                                        <span className="m-1 bold-font">{kFormatter(questionItem.owner['reputation'])}</span>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    )
                })
            }
        </div >
    );
}

export default Questions;