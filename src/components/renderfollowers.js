import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import React from 'react';
import Username from "./username";

export const RenderFollowers = ({users}) => {
    return users.map((user, i) =>
        <div key={i} className="followers">
            <img className="post-footer-photo"
                 src={(user.imgProfile && user.imgProfile.data) ?
                     `data:image/jpeg;base64,${user.imgProfile.data}` :
                     defaultProfilePhoto}
                 alt="user profile"/>
            <Username username={user.username} />
        </div>
    )
};
