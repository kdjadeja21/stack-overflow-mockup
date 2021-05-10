import React, { useEffect } from 'react';
import { Typography, Card, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, getUserTags, getUserQuestions } from './store/actions';

export function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh === 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
}

const Profile = () => {

    const dispatch = useDispatch();
    const routeParams = useParams();
    const user = useSelector(state => state.profile.user);

    useEffect(() => {
        dispatch(getUser(routeParams))
        dispatch(getUserTags(routeParams))
        dispatch(getUserQuestions(routeParams))
    }, [dispatch, routeParams])

    return (
        <div>
            <div className='profile'>
                {
                    user.userData && user.userData.items.map(userItem => (
                        <>
                            <div key={userItem.account_id} className='flex flex-row'>
                                <Card key={userItem.account_id} className='user-card'>
                                    <img src={userItem.profile_image} alt={userItem.account_id} /><br />
                                    <Typography variant='h6'>{userItem.reputation} <span style={{ fontSize: '13px' }}>REPUTATION</span></Typography>

                                    <span className='gold-badge'>{userItem.badge_counts['gold']}</span>
                                    <span className='silver-badge'>{userItem.badge_counts['silver']}</span>
                                    <span className='bronze-badge'>{userItem.badge_counts['bronze']}</span>

                                </Card>
                                <div className='ml-1'>
                                    <Typography variant='h5'>{userItem.display_name}</Typography>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
            {
                user.userTags && user.userTags.items.map(tag => (
                    <>
                        <span className='user-tag'>
                            {tag.name}
                        </span>
                    </>
                ))
            }

            {
                user.userQuestions && user.userQuestions.items.map(questionItem => (
                    <>
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
                    </>
                ))
            }

        </div>
    )
}

export default Profile;