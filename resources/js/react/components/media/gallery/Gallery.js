import api from "../../../routes/api";
import 'react-image-lightbox/style.css';
import styles from "./gallery.module.scss";
import Lightbox from 'react-image-lightbox';
import React, {useState, useEffect} from "react";
import ReactStars from "react-rating-stars-component";

// const images = [
//     'https://frontend-collective.github.io/react-image-lightbox/1.0d2c9d24.jpg',
//     'https://frontend-collective.github.io/react-image-lightbox/4.f0b0636a.jpg',
// ];


// class Gallery extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             photoIndex: 0,
//             isOpen: false,
//         };
//     }
//
//     render() {
//         const {photoIndex, isOpen} = this.state;
//         return (
//             <section>
//                 <div className={`container-fluid`}>
//                     {isOpen && (
//                         <Lightbox
//                             mainSrc={images[photoIndex]}
//                             nextSrc={images[(photoIndex + 1) % images.length]}
//                             prevSrc={images[(photoIndex + images.length - 1) % images.length]}
//                             onCloseRequest={() => this.setState({isOpen: false})}
//                             onMovePrevRequest={() =>
//                                 this.setState({
//                                     photoIndex: (photoIndex + images.length - 1) % images.length,
//                                 })
//                             }
//                             onMoveNextRequest={() =>
//                                 this.setState({
//                                     photoIndex: (photoIndex + 1) % images.length,
//                                 })
//                             }
//                         />
//                     )}
//                     <div className={`row`}>
//                         <div onClick={() => this.setState({isOpen: true})}
//                              className={`col-12 col-md-6 col-lg-3 col-xl-2 p-0 ${styles.box}`}>
//                             <div className={`${styles.layer}`}>
//                                 <i className="fas fa-camera"></i>
//                             </div>
//                             <img src="http://jellydemos.com/html/sonorama/img/gallery/thumb-05.jpg"
//                                  className={`img-fluid ${styles.image}`}/>
//                         </div>
//                     </div>
//                 </div>
//             </section>)
//     }
//
// }
//
// export default Gallery;

function Gallery() {
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        axios.get(api.singers.all).then(response => {
            if (response.data.success) {
                console.log('response.data',response.data)
                setUsers(response.data.users);
            }
        }).catch(error => {
            console.log('getUsersError', error)
        })
    }, []);

    const openImages = (user) => {
        let imagesArr = [];

        user.image_gallery.forEach(image => {
            let imagePath = `/storage/uploads/images/users/${user.id}/gallery/${image.image_name}`;

            imagesArr.push(imagePath);
        });

        setImages(imagesArr);

        setIsOpen(true)
    };

    return (
        <section>
            <div className={`container-fluid`}>
                <div className={`row`}>
                {users.map((user) => (
                    <div className={`col-12 col-md-6 col-lg-3 col-xl-2 p-0 ${styles.box}`} key={user.id}>
                        {isOpen && (
                            <Lightbox
                                mainSrc={images[photoIndex]}
                                nextSrc={images[(photoIndex + 1) % images.length]}
                                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                            />
                        )}

                        <div className={`w-100 h-100`} onClick={() => openImages(user)}>
                            <div className={`${styles.layer}`}>
                                <i className="fas fa-camera"></i>
                            </div>
                            <img src={`/storage/uploads/images/users/${user.id}/avatar/${user.profile_image}`}
                                 className={`${styles.image}`}/>
                        </div>

                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery
