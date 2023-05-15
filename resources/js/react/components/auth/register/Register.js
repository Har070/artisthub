import { useAlert } from 'react-alert';
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {useHistory} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../auth/register/register.module.scss";
import { storeValidation } from '../../../validation_modules/forms/form'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

function Register() {
    const alert = useAlert();
    const history = useHistory();

    const [state, setState] = useState({
        city: '',
        email: '',
        image: '',
        errors: {},
        country: '',
        zip_code: '',
        password: '',
        last_name: '',
        type: 'user',
        first_name: '',
        music_genre: '',
        dob: new Date(),
        description: '',
        chosenImage: '',
        phone_number: '',
    });

    useEffect(() => {
        if (state.image) {
            handleChange('chosenImage', URL.createObjectURL(state.image));
        }
    }, [state.image]);

    const handleChange = (field, value) => {
        console.log(field, value)
        if (Object.keys(state.errors).length) {
            let errors = state.errors;

            Object.keys(errors).forEach((item) => {
                if (item === field) {
                    errors[item] = '';

                    setState( {
                        ...state,
                        [errors]: errors,
                    });
                }
            })
        }

        setState({
            ...state,
            [field]: value,
        });
    };

    const changeImage = (event) => {
        handleChange('image', event.target.files[0]);
    };

    const signUp = () => {
        const formData = new FormData();
        let errors = storeValidation(state, 'register');

        if (errors && Object.keys(errors).length) {
            handleChange('errors', errors);

            Object.keys(errors).forEach((elem) => {
                alert.error(errors[elem]);
            });

            return
        }

        formData.append('city', state.city);
        formData.append('type', state.type);
        formData.append('email', state.email);
        formData.append('image', state.image);
        formData.append('country', state.country);
        formData.append('zip_code', state.zip_code);
        formData.append('password', state.password);
        formData.append('last_name', state.last_name);
        formData.append('first_name', state.first_name);
        formData.append('music_genre', state.music_genre);
        formData.append('description', state.description);
        formData.append('phone_number', state.phone_number);
        formData.append('dob', moment(state.dob).format('DD-MM-YYYY'));


        axios.post(api_routes.user.resource, formData).then(response => {
            if (response.data.success) {
                history.push('/login');
            }
        }).catch(error => {
            alert.error('Something went wrong!');
            console.log('!!!!!!!!', error.response)
        });
    };

    return (
        <section className={`mt-5`}>
            <div className="container">
                <div className="row row font-16">
                    <div className={`col-12 col-md-5`}>
                        <div className={styles.fileUploadStyles}>
                            <label className={`${styles.customFileUpload}`}>
                                <input type="file"
                                       id="user_image"
                                       className="form-control"
                                       onChange={changeImage}
                                />
                                <img className={`${styles.image} img-fluid`}
                                     src={!state.chosenImage ? '/images/user/default/default.jpg' : state.chosenImage}
                                />
                                {state.errors && state.errors.image &&
                                <div className={`${styles.errorMessage}`}>{state.errors.image}</div>
                                }
                            </label>
                        </div>
                    </div>
                    <div className={`col-12 col-md-7 text-white`}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                       id="first_name"
                                       name="first_name"
                                       value={state.first_name}
                                       className="form-control"
                                       placeholder="Enter Your First Name"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.first_name &&
                                <div className={`${styles.errorMessage}`}>{state.errors.first_name}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                       id="last_name"
                                       name="last_name"
                                       value={state.last_name}
                                       className="form-control"
                                       placeholder="Enter Your Last Name"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.last_name &&
                                <div className={`${styles.errorMessage}`}>{state.errors.last_name}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Your Position</label>
                                <select id='type'
                                        name='type'
                                        value={state.type}
                                         className="form-control"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="singer">Singer</option>
                                </select>
                                {state.errors && state.errors.type &&
                                <div className={`${styles.errorMessage}`}>{state.errors.type}</div>
                                }
                            </div>
                            {state.type && state.type === 'singer' &&
                            <div className="form-group">
                                <label htmlFor="music_genre">Music Genre</label>
                                <select id='music_genre'
                                        name="music_genre"
                                        className="form-control"
                                        value={state.music_genre}
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
                                {state.errors && state.errors.music_genre &&
                                <div className={`${styles.errorMessage}`}>{state.errors.music_genre}</div>
                                }
                            </div>
                            }
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <CountryDropdown id="country"
                                                 value={state.country}
                                                 className="form-control"
                                                 onChange={(val) => handleChange('country', val)}
                                />
                                {state.errors && state.errors.country &&
                                <div className={`${styles.errorMessage}`}>{state.errors.country}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <RegionDropdown id="city"
                                                value={state.city}
                                                country={state.country}
                                                className="form-control"
                                                onChange={(val) => handleChange('city', val)}
                                />
                                {state.errors && state.errors.city &&
                                <div className={`${styles.errorMessage}`}>{state.errors.city}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip_code">Zip Code</label>
                                <input id="zip_code"
                                       type="number"
                                       name="zip_code"
                                       value={state.zip_code}
                                       className="form-control"
                                       placeholder="Enter Your Zip Code"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.zip_code &&
                                <div className={`${styles.errorMessage}`}>{state.errors.zip_code}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input id="phone_number"
                                       type="number"
                                       name="phone_number"
                                       value={state.phone_number}
                                       className="form-control"
                                       placeholder="Enter Your Phone Number"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.phone_number &&
                                <div className={`${styles.errorMessage}`}>{state.errors.phone_number}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <DatePicker selected={state.dob}
                                            peekNextMonth
                                            showYearDropdown
                                            showMonthDropdown
                                            dropdownMode="select"
                                            dateFormat="dd-MM-yyyy"
                                            className="form-control"
                                            onChange={(date) => handleChange('dob', date)}
                                />
                                {state.errors && state.errors.dob &&
                                <div className={`${styles.errorMessage}`}>{state.errors.dob}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input id="email"
                                       name="email"
                                       type="email"
                                       value={state.email}
                                       className="form-control"
                                       placeholder="Enter Your E-mail"
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                {state.errors && state.errors.email &&
                                <div className={`${styles.errorMessage}`}>{state.errors.email}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor='password'>Password</label>
                                <input id='password'
                                       name='password'
                                       type='password'
                                       value={state.password}
                                       className='form-control'
                                       placeholder='Enter Password'
                                       onChange={(e) => handleChange(e.target.name, e.target.value)}
                                       onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.password &&
                                <div className={`${styles.errorMessage}`}>{state.errors.password}</div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Biography</label>
                                <textarea id='description'
                                          name="description"
                                          className="form-control"
                                          value={state.description}
                                          placeholder='Biography'
                                          onChange={(e) => handleChange(e.target.name, e.target.value)}
                                          onBlur={(e) => {console.log('e')}}
                                />
                                {state.errors && state.errors.description &&
                                <div className={`${styles.errorMessage}`}>{state.errors.description}</div>
                                }
                            </div>
                            <div className="col-md-12 text-center mt-4">
                                <button className="btn btn-primary rounded-pill text-uppercase" type="button" onClick={signUp}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
