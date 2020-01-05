import React, {Component} from 'react';
import {Spacer} from "../small/spacer";

export default class Username extends Component {
    render() {
        return (
            <div>
                <Spacer />
                <b>About:</b>
                <div className="about-para">
                    <b className="color-cycle">2FIVEEIGHT</b> is an evolution on social media for the next generation of youth.
                    Designed to be a reduced stress experience in an ever-connected society.
                    With the intentional omission of “likes,” our users will no longer feel the pressure to tie their
                    self-worth to a non-consequential number system.
                    We believe strongly that our users deserve more than a popularity ranking system based on a dopamine
                        drip feedback loop.<br />
                </div>
                <b>Features:</b><br /><br />
                <div className="about-features">
                •	Image based post system.<br /><br />
                        •	Each image is <b>258x258 pixels</b> for stylish retro cohesiveness.<br /><br />
                        •	Descriptions on posts can be up to <b>258 characters</b>.<br /><br />
                •	Up-to five (5) hashtags per post.<br /><br />
                    •	Global <i>chronological feed</i> to find new artists and personalities. Everyone has <b>equal visibility</b>.<br /><br />
                    •	Chronological follower feed. See posts when they happen; you are <b>not</b> at the mercy of
                    the <b>algorithms</b>.<br /><br />
                    •	<b>Long term privacy!</b> Your posts will be automatically deleted after a week. While this doesn’t
                        stop anyone from downloading posts as they happen, no more worrying about your past mistakes
                    coming back to haunt you.
                </div>
                <Spacer/>
            </div>
        )
    }
}
