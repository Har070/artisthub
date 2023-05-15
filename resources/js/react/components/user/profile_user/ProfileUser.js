import { useAlert } from 'react-alert';
import DatePicker from "react-datepicker";
import styles from "./profile_user.module.scss";
import React, {useEffect, useState} from "react";
import Headers from "../../media/headers/Headers";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from "react-redux";
import {updateValidation} from "../../../validation_modules/forms/form";
import {selectAuth, setAuth} from "../../../redux/reducers/auth/authSlice";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import CreateAlbum from "../../modals/fileUploads/songs/createAlbum/CreateAlbum";

function ProfileUser() {
    const [showCreateAlbum, setShowCreateAlbum] = useState(false);
    const [user, setUser] = useState({
        type: '',
        city: '',
        email: '',
        errors: {},
        // videos: [],
        country: '',
        zip_code: '',
        last_name: '',
        first_name: '',
        music_genre: '',
        description: '',
        chosenImage: '',
        // dob: new Date(),
        phone_number: '',
        profile_image: '',
        multipleImages: [],
    });

    const alert = useAlert();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if (auth) {
            setUser(auth);

            if (auth.images && auth.images.length) {
                let images = [];

                auth.images.forEach((image) => {
                    images.push(`/storage/uploads/images/users/${auth.id}/gallery/${image.image_name}`);
                });

                setUser(user => ({
                    ...user,
                    multipleImages: images,
                }));
            }
        }
    }, [auth]);

    const handleChange = (field, value) => {
        let errors = user.errors;

        if (errors && Object.keys(errors).length) {
            Object.keys(errors).forEach((item) => {
                if (item === field) {
                    errors[item] = '';

                    setUser( {
                        ...user,
                        [errors]: errors,
                    });
                }
            })
        }

        setUser({
            ...user,
            [field]: value,
        });
    };

    const changeImage = (event) => {
        setUser(
            {
                ...user,
                ['profile_image']: event.target.files[0],
                ['chosenImage']: URL.createObjectURL(event.target.files[0]),
            }
        )
    };

    const uploadPhotos = (event) => {
        if (event.target.files.length) {
            let file = event.target.files[0];
            let imagesArray = user.multipleImages ? user.multipleImages.concat(file) : [file];

            setUser({
                ...user,
                ['multipleImages']: imagesArray,
            });
        }
    };

    const removeMultipleImages = (val, ind) => {
        console.log(12,val);
        user.multipleImages.forEach((image, index, object) => {
            if(index === ind) {
                object.splice(ind, 1);

                setUser({
                    ...user,
                    ['multipleImages']: user.multipleImages,
                });
            }
        });
    };

    const update = () => {
        const formData = new FormData();
        let errors = updateValidation(user);

        if (errors && Object.keys(errors).length) {
            handleChange('errors', errors);

            Object.keys(errors).forEach((elem) => {
                alert.error(errors[elem]);
            });

            return
        }

        formData.append('dob', user.dob);
        formData.append('city', user.city);
        formData.append('type', user.type);
        formData.append("_method", "PUT");
        formData.append('country', user.country);
        formData.append('zip_code', user.zip_code);
        formData.append('last_name', user.last_name);
        formData.append('first_name', user.first_name);
        formData.append('music_genre', user.music_genre);
        formData.append('description', user.description);
        formData.append('phone_number', user.phone_number);
        formData.append('profile_image', user.profile_image);
        // formData.append('dob', moment(user.dob).format('DD-MM-YYYY'));

        if (user.multipleImages) {
            user.multipleImages.forEach((image_file) => {
                formData.append('multiple_images[]', image_file);
            });
        }

        axios.post(api_routes.user.update(user.id), formData).then(response => {
            if (response.data.success) {
                alert.success(response.data.message);
                dispatch(setAuth(response.data.user));
            }
        }).catch(error => {
            alert.error('Something went wrong!')
        });
    };


    const handleOpenModal = () => {
        this.setState({showModal: true});
    }

    const handleCloseModal = () => {
        this.setState({showModal: false});
    }

    const openModal = (event) => {
        if (event === 'createAlbum') {
            setShowCreateAlbum(true)
        }
      console.log('data',event)
    };

    const closeModal = (event) => {
        if (event === 'createAlbum') {
            setShowCreateAlbum(false)
        }
    };

    return (
        <section className={"mt-5"}>
            <div className="container">
                <Headers title={`Change Your Profile Data`}/>
                <div className="row font-16">
                    <div className={`col-12 col-md-5`}>
                        <div className={styles.fileUploadStyles}>
                            <label className={`${styles.customFileUpload} p-0`}>
                                <input type="file"
                                       id="user_image"
                                       className="form-control"
                                       onChange={changeImage}
                                />
                                <img className={`${styles.image} img-fluid`} src={user.chosenImage ? user.chosenImage :
                                    `/storage/uploads/images/users/${user.id}/avatar/${user.profile_image}`}/>
                            </label>
                        </div>
                        {auth && auth.type === 'singer' &&
                        <div className={'mt-4'}>
                            <ul className={`list-unstyled d-flex`}>
                                <li className={`mr-4`}
                                    onClick={() => openModal('createAlbum')}
                                >
                                    <h4 className={`border-left pl-2`}>
                                        <div className={styles.fileUploadStyles}>
                                            <div className={`${styles.customFileUpload} m-0`}>
                                                <i className="fas fa-music mr-2"></i>
                                                Add Musics
                                            </div>
                                        </div>
                                    </h4>
                                </li>
                                <li className={`mr-4`}>
                                    <h4 className={`border-left pl-2`}>
                                        <div className={styles.fileUploadStyles}>
                                            <label className={`${styles.customFileUpload} m-0`}>
                                                <input type="file" multiple onChange={uploadPhotos}/>
                                                <i className="fas fa-images mr-2"></i>
                                                Add Photos
                                            </label>
                                        </div>
                                    </h4>
                                </li>
                            {/*    <li>*/}
                            {/*        <h4 className={`border-left pl-2`}>*/}
                            {/*            <div className={styles.fileUploadStyles}>*/}
                            {/*                <label className={`${styles.customFileUpload}`}>*/}
                            {/*                    <input type="file" multiple onChange={uploadVideos}/>*/}
                            {/*                    <i className="fas fa-video mr-2"></i>*/}
                            {/*                    Add Videos*/}
                            {/*                </label>*/}
                            {/*                /!*{this.state.files.map(x =>*!/*/}
                            {/*                /!*    <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>*!/*/}
                            {/*                /!*)}*!/*/}
                            {/*            </div>*/}
                            {/*        </h4>*/}
                            {/*    </li>*/}
                            </ul>
                            {
                                user.multipleImages && user.multipleImages.length &&
                                    <div className={`${styles.multipleImagesBox}`}>
                                        {
                                            user.multipleImages.map((image, index) =>
                                                <img key={index}
                                                     src={ image && typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                     className={`${styles.multipleImages} img-fluid file-preview pointer`}
                                                     onClick={() => removeMultipleImages(image, index)}
                                                />
                                            )
                                        }
                                    </div>
                            }
                        </div>
                        }
                    </div>
                    <div className={`col-12 col-md-7 text-white`}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                       id="first_name"
                                       name="first_name"
                                       value={user.first_name}
                                       className="form-control"
                                       placeholder="Enter Your First Name"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {user.errors && user.errors.first_name &&
                                <div className={`${styles.errorMessage}`}>{user.errors.first_name}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                       id="last_name"
                                       name="last_name"
                                       value={user.last_name}
                                       className="form-control"
                                       placeholder="Enter Your Last Name"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {user.errors && user.errors.last_name &&
                                <div className={`${styles.errorMessage}`}>{user.errors.last_name}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Your Position</label>
                                <select id='type'
                                        name='type'
                                        value={user.type}
                                        className="form-control"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="singer">Singer</option>
                                </select>
                                {user.errors && user.errors.type &&
                                <div className={`${styles.errorMessage}`}>{user.errors.type}</div>
                                }
                            </div>
                            {user.type && user.type === 'singer' &&
                            <div className="form-group">
                                <label htmlFor="musicGenre">Music Genre</label>
                                <select id='musicGenre'
                                        name="musicGenre"
                                        className="form-control"
                                        value={user.music_genre}
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                >
                                    <option disabled value="">- select your music genre</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Blues">Blues</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Rhythm and Blues">Rhythm and Blues</option>
                                    <option value="Rock and Roll">Rock and Roll</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Country">Country</option>
                                    <option value="Soul">Soul</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Hip Hop">Hip Hop</option>
                                </select>
                                {user.errors && user.errors.music_genre &&
                                <div className={`${styles.errorMessage}`}>{user.errors.music_genre}</div>
                                }
                            </div>
                            }
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <CountryDropdown id="country"
                                                 value={user.country}
                                                 className="form-control"
                                                 onChange={(val) => handleChange('country', val)}
                                />
                                {user.errors && user.errors.country &&
                                <div className={`${styles.errorMessage}`}>{user.errors.country}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <RegionDropdown id="city"
                                                value={user.city}
                                                country={user.country}
                                                className="form-control"
                                                onChange={(val) => handleChange('city', val)}
                                />
                                {user.errors && user.errors.city &&
                                <div className={`${styles.errorMessage}`}>{user.errors.city}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip_code">Zip Code</label>
                                <input id="zip_code"
                                       type="number"
                                       name="zip_code"
                                       value={user.zip_code}
                                       className="form-control"
                                       placeholder="Enter Your Zip Code"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {user.errors && user.errors.zip_code &&
                                <div className={`${styles.errorMessage}`}>{user.errors.zip_code}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input id="phone_number"
                                       type="number"
                                       name="phone_number"
                                       value={user.phone_number}
                                       className="form-control"
                                       placeholder="Enter Your Phone Number"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {user.errors && user.errors.phone_number &&
                                <div className={`${styles.errorMessage}`}>{user.errors.phone_number}</div>
                                }
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="dob">Date of Birth</label>*/}
                            {/*    <DatePicker*/}
                            {/*        // selected={user.dob}*/}
                            {/*        selected={new Date(moment(user.dob,'dd-MM-yyyy').format('MM-dd-yyyy'))}*/}
                            {/*                peekNextMonth*/}
                            {/*                showYearDropdown*/}
                            {/*                showMonthDropdown*/}
                            {/*                dropdownMode="select"*/}
                            {/*                dateFormat="Pp"*/}
                            {/*                className="form-control"*/}
                            {/*                onChange={(date) => handleChange('dob', date)}*/}
                            {/*    />*/}
                            {/*    {user.errors && user.errors.dob &&*/}
                            {/*    <div className={`${styles.errorMessage}`}>{user.errors.dob}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input disabled
                                       id="email"
                                       name="email"
                                       type="email"
                                       value={user.email}
                                       className="form-control"
                                       placeholder="Enter Your E-mail"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                {user.errors && user.errors.email &&
                                <div className={`${styles.errorMessage}`}>{user.errors.email}</div>
                                }
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor='password'>Password</label>*/}
                            {/*    <input id='password'*/}
                            {/*           name='password'*/}
                            {/*           type='password'*/}
                            {/*           value={user.password}*/}
                            {/*           className='form-control'*/}
                            {/*           placeholder='Enter Password'*/}
                            {/*           onChange={(e) => handleChange(e.target.name, e.target.value)}*/}
                            {/*           onBlur={(e) => {console.log('e')}}*/}
                            {/*    />*/}
                            {/*    {user.errors && user.errors.password &&*/}
                            {/*    <div className={`${styles.errorMessage}`}>{user.errors.password}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <label htmlFor="description">Biography</label>
                                <textarea id='description'
                                          name="description"
                                          value={user.description}
                                          className="form-control"
                                          placeholder="Enter Your Biography"
                                          onChange={(e) => handleChange(e.target.name, e.target.value)}
                                          onBlur={(e) => {console.log('e')}}
                                />
                                {user.errors && user.errors.description &&
                                <div className={`${styles.errorMessage}`}>{user.errors.description}</div>
                                }
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="user_image">Image</label>*/}
                            {/*    <div className={`form-file-group`}>*/}
                            {/*        <input type="text" placeholder={`Choose image`} className={`form-control`}/>*/}
                            {/*        <input type="file"*/}
                            {/*               id="user_image"*/}
                            {/*               className="form-control"*/}
                            {/*               onChange={changeImage}*/}
                            {/*        />*/}
                            {/*        {user.errors && user.errors.image &&*/}
                            {/*        <div className={`${styles.errorMessage}`}>{user.errors.image}</div>*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="col-md-12 text-center">
                                <button className="btn btn-primary rounded-pill" type="button" onClick={update}>
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <CreateAlbum show={showCreateAlbum} onHide={() => closeModal('createAlbum')} />
        </section>
    );
}

export default ProfileUser;
