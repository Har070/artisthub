import api from '../../../routes/api';
import { useAlert } from 'react-alert';
import {useSelector} from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './default_user.module.scss';
import ReactStars from "react-rating-stars-component";
import {selectAuth} from "../../../redux/reducers/auth/authSlice";

function DefaultUser() {
    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(false);

    const alert = useAlert();
    const { id } = useParams();
    const auth = useSelector(selectAuth);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios.get(api.user.resource, {params: {id: id}}).then(response => {
            if (response.data.success && Object.keys(response.data.user).length) {
                setUser(response.data.user)
            }
        }).catch(error => {
            alert.error('Something went wrong!');
        })
    };

    const rate = (rate) => {
        setToggle(false);

        let data = {
            rating: rate,
            singer_id: user.id
        };

        axios.post(api.user.rating.resource, data).then(response => {
            if (response.data.success) {
                console.log(response.data.user)
                setUser(
                    {
                        ...user,
                        ['ratings']: response.data.user.ratings,
                    }
                );
                alert.success(response.data.message);
            }

            setToggle(true);
        }).catch(error => {
            alert.error('Something went wrong!');
        })
    };

    let channel = pusher.subscribe(`singer-${user.id}-rated`);
    channel.unbind('singer-rated');
    channel.bind('singer-rated', ({data}) => {
        if (data.success) {
            getUser()
        }
    });

    return (
        <section>
            <div className={`container mt-5`}>
                {user && !Object.keys(user).length &&
                    <div className={`${styles.textCenter}`}>
                       <h3> User Not Found</h3>
                    </div>
                }
                {user && Object.keys(user).length &&
                    <div className={`row font-16`}>
                        <div className={`col-12 col-md-5`}>
                            <img className={`${styles.images} img-fluid`}
                                 src={user.profile_image ?
                                     `/storage/uploads/images/users/${user.id}/avatar/${user.profile_image}` :
                                     '/images/user/default/default.jpg'}/>
                        </div>
                        <div className={`col-12 col-md-7 text-white`}>
                            <div>
                                <p>MY INTRO</p>
                                <h3 className={`font-weight-bold of-text-danger`}>About Me</h3>
                            </div>

                            <div>
                                <p>{user.description}</p>
                            </div>

                            <div className={`d-flex`}>
                                <div className={`mr-4`}>
                                    <strong className={`d-block of-text-danger`}>Name:</strong>
                                    <strong className={`d-block of-text-danger`}>Category:</strong>
                                    <strong className={`d-block of-text-danger`}>Country:</strong>
                                    <strong className={`d-block of-text-danger`}>City:</strong>
                                    <strong className={`d-block of-text-danger`}>Zip code:</strong>
                                    <strong className={`d-block of-text-danger`}>Date of birth:</strong>
                                    <strong className={`d-block of-text-danger`}>Phone:</strong>
                                    <strong className={`d-block of-text-danger`}>Email:</strong>
                                </div>
                                <div>
                                    <span className={`d-block`}>{user.first_name} {user.last_name}</span>
                                    <span className={`d-block`}>{user.music_genre} Musician</span>
                                    <span className={`d-block`}>{user.country}</span>
                                    <span className={`d-block`}>{user.city}</span>
                                    <span className={`d-block`}>{user.zip_code}</span>
                                    <span className={`d-block`}>{user.dob}</span>
                                    <span className={`d-block`}>{user.phone_number}</span>
                                    <span className={`d-block`}>{user.email}</span>
                                </div>
                            </div>

                            <div className={'mt-4'}>
                                <ul className={`list-unstyled d-flex`}>
                                    <li className={`mr-4`}>
                                        <h4 className={`border-left pl-2`}>
                                            <i className="fas fa-music mr-2"></i>
                                            Music
                                        </h4>
                                    </li>
                                    <li className={`mr-4`}>
                                       <h4 className={`border-left pl-2`}>
                                           <i className="fas fa-images mr-2"></i>
                                           Photos
                                       </h4>
                                    </li>
                                    <li>
                                        <h4 className={`border-left pl-2`}>
                                            <i className="fas fa-video mr-2"></i>
                                            Videos
                                        </h4>
                                    </li>
                                </ul>
                            </div>
                            <div className={'row align-items-center'}>
                                <div className={'col-12 col-md-7 col-xl-4'}>
                                    <ReactStars
                                        count={5}
                                        size={40}
                                        isHalf={true}
                                        onChange={rate}
                                        activeColor="red"
                                        value={user.ratings.rating}
                                        edit={auth ? true : false}
                                    />
                                </div>
                                <div className={`col-12 col-md-5 col-lg-4`}>
                                    <h4>
                                        {user.ratings.count} votes
                                    </h4>
                                    <h4>
                                        {user.ratings.rating.toFixed(1)}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default DefaultUser
