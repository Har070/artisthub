import styles from './create_album.module.scss';
import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";

function CreateAlbum(props) {
    const { show, onHide } = props;
    // const [show, setShow] = useState(false);
    const [album, setAlbum] = useState({
        name: '',
        genre: '',
        image: '',
        songs: [],
    });

    const handleChange = (field, value) => {
        console.log('field', field)
        console.log('value', value)

        setAlbum({
            ...album,
            [field]: value,
        });
    };

    // const handleClose = () => setShow(false);

    const uploadSongs = (event) => {
        if (event.target.files.length) {
            let file = event.target.files[0];
            let songsArray = album.songs ? album.songs.concat(file) : [file];

            setAlbum({
                ...album,
                ['multipleSongs']: songsArray,
            });
        }
    };

    return (
        <section>
            <Modal size="lg" show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Musics Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className={styles.fileUploadStyles}>
                            <label className={`${styles.customFileUpload} p-0`}>
                                <input type="file"
                                       id="user_image"
                                       className="form-control"
                                       onChange={handleChange}
                                />
                                {/*<img className={`${styles.image} img-fluid`} src={user.chosenImage ? user.chosenImage :*/}
                                {/*    `/storage/uploads/musics/users/${user.id}/albums/${user.album.id}`}/>*/}
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Album Name</label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   value={album.name}
                                   className="form-control"
                                   placeholder="Enter Album Name"
                                   onChange={(e) => handleChange(e.target.name, e.target.value)}
                                   onBlur={(e) => {console.log('e')}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Music Genre</label>
                            <select id='genre'
                                    name="genre"
                                    className="form-control"
                                    value={album.genre}
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
                        </div>
                        <div className="form-group">
                            <h4 className={`pl-2`}>
                                <div className={styles.fileUploadStyles}>
                                    <label className={`${styles.customFileUpload} m-0`}>
                                        <input type="file" multiple onChange={uploadSongs}/>
                                        <i className="fas fa-music mr-2"></i>
                                        Add Musics
                                    </label>
                                </div>
                            </h4>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default CreateAlbum;
