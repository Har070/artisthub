import styles from './all_users.module.scss';
import api from '../../../routes/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(api.singers.all).then(response => {
            if (response.data.success) {

                setUsers(response.data.users)
            }
        }).catch(error => {
            console.log('getUsersError', error)
        })

    }, []);

    return (
        <section className={`mt-5`}>
            <div className={`container`}>
                <ul className={`row list-unstyled`}>
                    {users.map((user, key) => (
                        <li key={user.id} className={`col-12 col-md-6 col-lg-3 p-md-0 mb-3 mb-md-0 ${styles.box}`}>
                            <Link className={`link-unstyled`} to={`/users/${user.id}`}>
                                <div className={`d-flex flex-column `}>
                                    <div className={`${styles.squerBox} ${styles.imageBox} ${key % 2 == 0 ? 'order-1' : 'order-2'}`}>
                                        <img className={`${styles.images}`}
                                             src={user.profile_image ?
                                                 `/storage/uploads/images/users/${user.id}/avatar/${user.profile_image}` :
                                                 '/images/user/default/default.jpg'}/>
                                    </div>
                                    <div className={`${styles.newsBox} ${styles.squerBox} p-3 d-flex flex-column justify-content-between ${key % 2 == 0 ? 'order-2' : 'order-1'}`}>
                                        <div>
                                            <h2 className={`of-text-danger text-uppercase`}>{user.first_name} {user.last_name}</h2>
                                            <p className={`of-text-secondary h5 text-ellipsis-bottom`}>{user.description}</p>
                                        </div>
                                        <div className={`mt-2`}>
                                            <h5 className={`of-text-danger`}> {user.created_at}</h5>
                                        </div>
                                        <ReactStars
                                            count={5}
                                            size={30}
                                            isHalf={true}
                                            activeColor="#FF9529"
                                            value={user.ratings.rating}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
        </section>
    )
}

export default AllUsers
