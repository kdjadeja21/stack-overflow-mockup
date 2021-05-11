import React, { useEffect } from 'react';
import { Typography, Card, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, getUserTags, getUserQuestions } from './store/actions';
import { kFormatter } from '../question-page/Questions'

export function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
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

                            <div key={userItem.account_id} className="grid--cell fl-shrink0 overflow-hidden">
                                <div id="avatar-card" className="profile-avatar s-card mb16 p12 bc-black-100 ta-center">
                                    <div className="avatar mt16 mx-auto overflow-hidden">
                                        <a className="d-block" href="https://stackoverflow.com/users/5239702/78dtat78da">
                                            <div className="gravatar-wrapper-164">
                                                <img src={userItem.profile_image} alt={userItem.account_id} width="164" height="164" className="bar-sm avatar-user" />

                                            </div>
                                        </a>
                                    </div>
                                    <div className="my12 fw-normal lh-sm" title="reputation">
                                        <div className="grid gs8 grid__center">
                                            <div className="grid--cell fs-title fc-dark">{userItem.reputation}</div>
                                            <div className="grid--cell fs-fine fc-light tt-uppercase">reputation</div>
                                        </div>
                                    </div>
                                    <div className="m4">
                                        <div className="grid gs4 grid__fl1">

                                            <div className="grid--cell">
                                                <div className="grid ai-center s-badge s-badge__gold" title="1 gold badge">
                                                    <span className="grid--cell badge1"></span>
                                                    <span className="grid grid__center fl1">1</span>
                                                </div>
                                            </div>

                                            <div className="grid--cell">
                                                <div className="grid ai-center s-badge s-badge__silver" title="1 silver badge">
                                                    <span className="grid--cell badge2"></span>
                                                    <span className="grid grid__center fl1">{userItem.badge_counts['gold']}</span>
                                                </div>
                                            </div>

                                            <div className="grid--cell">
                                                <div className="grid ai-center s-badge s-badge__bronze" title="9 bronze badges">
                                                    <span className="grid--cell badge3"></span>
                                                    <span className="grid grid__center fl1">9</span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="userName">
                                    <Typography variant='h5'>{userItem.display_name}</Typography>
                                </div>

                            </div>
                        </>
                    ))
                }
                <div className="clear-both">
                    <Typography variant='h5' className="question-heading">Top Tags</Typography> <br /> <br />
                    {
                        user.userTags && user.userTags.items.map(tag => (
                            <div key={tag.name} className='user-tag'>
                                {tag.name}
                            </div>
                        ))
                    }
                </div>
            </div><br /> <br />


            <div className="clear-both">
                <Typography variant='h5' className="question-heading">Top Questions</Typography> <br />
                {
                    user.userQuestions && user.userQuestions.items.map(questionItem => (
                        <div key={questionItem.question_id}>
                            <Card className='questionCard'>

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
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Profile;