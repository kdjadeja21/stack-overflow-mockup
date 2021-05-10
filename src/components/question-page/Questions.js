import React, { useEffect } from 'react';
import { Typography, Card, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from './store/actions';
import SkeletonLoading from '../skeleton-loading/skeletonLoading';
import { convertTimestamp } from '../profile/Profile';

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
            <Typography variant={'h3'}> Top Questions</Typography>
            {
                featuredQuestions && featuredQuestions.items.map(questionItem => {
                    return (
                        <Card key={questionItem.question_id} className='questionCard'>

                            <Typography>
                                <span className='flex flex-row item-center justify-center'>
                                    <span className='flex flex-column ml-5'>
                                        <span className='votes'>
                                            {questionItem.score}
                                        </span> <span>votes</span>
                                    </span>
                                    <span className='flex flex-column ml-5'>
                                        <span className='answers'>
                                            {questionItem.answer_count}
                                        </span> <span>answers</span>
                                    </span>
                                    <span className='flex flex-column ml-5'>
                                        <span className='views'>
                                            {questionItem.view_count}
                                        </span> <span>views</span>
                                    </span>

                                    <span className="bounty">{questionItem.bounty_amount && '+' + questionItem.bounty_amount}</span>

                                    <Link className="no-underline" href={questionItem.link}>{questionItem.title}</Link>
                                </span>
                            </Typography><br />
                            {
                                questionItem.tags.map(tag => (
                                    <span key={tag} className="questionTags">{tag}</span>
                                ))
                            }
                            <span>{(questionItem.is_answered ? 'answered ' : 'modified ') +
                                convertTimestamp(questionItem.last_activity_date) + " "}
                                <Link
                                    className="no-underline"
                                    href={"/user-profile/" + questionItem.owner['user_id']}
                                >
                                    {questionItem.owner['display_name']}
                                </Link></span>
                        </Card>
                    )
                })
            }
        </div >
    );
}

export default Questions;