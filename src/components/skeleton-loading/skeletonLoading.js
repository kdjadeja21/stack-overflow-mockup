import React from 'react';
import './style.css';

const SkeletonLoading = () => {
    return (
        <ul className="o-vertical-spacing o-vertical-spacing--l">
            <li className="blog-post o-media">
                <div className="o-media__body">
                    <div className="o-vertical-spacing">
                        <h3 className="blog-post__headline">
                            <span className="skeleton-box" style={{ width: '90%' }}></span>
                        </h3>
                        <p>
                            <span className="skeleton-box" style={{ width: '80%' }}></span>
                        </p>
                    </div>
                </div>
            </li>
            <li className="blog-post o-media">
                <div className="o-media__body">
                    <div className="o-vertical-spacing">
                        <h3 className="blog-post__headline">
                            <span className="skeleton-box" style={{ width: '90%' }}></span>
                        </h3>
                        <p>
                            <span className="skeleton-box" style={{ width: '80%' }}></span>
                        </p>
                    </div>
                </div>
            </li>
            <li className="blog-post o-media">
                <div className="o-media__body">
                    <div className="o-vertical-spacing">
                        <h3 className="blog-post__headline">
                            <span className="skeleton-box" style={{ width: '90%' }}></span>
                        </h3>
                        <p>
                            <span className="skeleton-box" style={{ width: '80%' }}></span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default SkeletonLoading