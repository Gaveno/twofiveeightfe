import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import React from 'react';
import Username from "./username";
import {arrayBufferToBase64} from "../actions/helpers";
import profilePhotoCrop from "../images/profilePhotoCrop.png";


export const RenderFollowers = ({users}) => {
    return users.map((user, i) =>
        <div key={i} className="followers">
            <div className="followers-photo-container">
                <img className="after"
                    src={(user.imgProfile && user.imgProfile.data) ?
                         `data:image/jpeg;base64,${arrayBufferToBase64(user.imgProfile.data.data)}` :
                         defaultProfilePhoto}
                     alt="user profile"/>
                <img className="after"
                     src={profilePhotoCrop}
                     alt="crop user profile"/>

            </div>
            <div className="followers-username">
                <Username username={user.username} />
            </div>
        </div>
    )

};
