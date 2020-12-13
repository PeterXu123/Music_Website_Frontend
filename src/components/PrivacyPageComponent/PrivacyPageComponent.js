import React from 'react';

const PrivacyPageCompnents = () => {
    return (
        <div className="container">
            <ol className="list-group">
                <li>
                    <p>We collect the data that the user created such as their usernames, email, and phoneNumber. If the
                        user likes songs or add friends, we will know that from
                        our database. </p>
                </li>
                <li>
                    <p>The basic function of our website is to create a search music website where logged in user can
                        comment and add friends (also support delete own comments and remove friends)
                        Although we will not use the collected data to make profit, it could help us know which song is
                        the most favorite song among our users. And we could recommend it to all users.
                    </p>
                </li>

            </ol>
        </div>
    );
};

export default PrivacyPageCompnents;
