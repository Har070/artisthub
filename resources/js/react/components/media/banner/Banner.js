import api from "../../../routes/api";
import {useEffect, useState} from "react";
import styles from './banner.module.scss';
import 'react-jinke-music-player/assets/index.css';
import ReactJkMusicPlayer from 'react-jinke-music-player';

function Banner() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(api.singers.top).then(response => {
            if (response.data.success) {
                setUsers(response.data.users)
            }
        }).catch(error => {
            console.log('Banner', error)
        })

    }, []);

    return (
        <section className={`${styles.bannerSection}`}>
            <div id="topCarousel" className="carousel slide h-100 carousel-fade" data-ride="carousel">
                <ol className={`carousel-indicators d-flex d-md-none ${styles.indicatorBox}`}>
                    <li data-target="#topCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#topCarousel" data-slide-to="1"></li>
                    <li data-target="#topCarousel" data-slide-to="2"></li>
                </ol>
                {users.length &&
                <div className="carousel-inner h-100">
                    {users.map((user, key) => (
                        <div key={`${user.id}`}
                             className={`${key === 0 ? 'carousel-item active h-100' : 'carousel-item h-100'}`}>
                            <div className={`${styles.imageBox} h-100`}>
                                <img className="object-cover d-block w-100 h-100"
                                    src={`/storage/uploads/images/users/${user.id}/gallery/${user.image_gallery[0]?.image_name}`}
                                />
                            </div>
                            <div className={`${styles.carouselCaption} carousel-caption d-flex align-items-center justify-content-center text-white`}>
                                <div>
                                    <div className={`${styles.genreBox} d-none d-md-flex`}>
                                        <hr/>
                                        <h2>{user.music_genre} Musician</h2>
                                        <hr/>
                                    </div>
                                    <div className={`${styles.nameBox}`}>
                                        <h2>{user.first_name} {user.last_name}</h2>
                                        <div className={styles.squareBox}>
                                            <hr/>
                                            <i className="fas fa-square-full"></i>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className={`mt-3`}>
                                        <p>{user.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                }
                <a className={`${styles.carouselControl} carousel-control-prev d-none d-md-flex`} href="#topCarousel" role="button" data-slide="prev">
                    <i className={`${styles.carouselControlIcon} fas fa-chevron-left`}></i>
                </a>
                <a className={`${styles.carouselControl} carousel-control-next d-none d-md-flex`} href="#topCarousel" role="button" data-slide="next">
                    <i className={`${styles.carouselControlIcon} fas fa-chevron-right`}></i>
                </a>
            </div>

            <div className="full-wrapper">
                <ReactJkMusicPlayer />
            </div>
        </section>
    )
}

export default Banner
