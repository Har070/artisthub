import styles from './footer.module.scss'
import Headers from "../../media/headers/Headers";
import React from "react";

function Footer() {
    return (
        <div className={`${styles.footerClean} sectionSpace`}>
            <footer className={`${styles.footer}`}>
                <div className="container">
                    <Headers title={`SOCIAL NETWORKS`}/>
                    <div className="d-flex justify-content-center">
                        <a href="#" className={`${styles.box}`}>
                            <i className={`fab fa-facebook-f ${styles.icon}`}></i>
                        </a>
                        <a href="#" className={`${styles.box}`}>
                            <i className={`fab fa-youtube ${styles.icon}`}></i>
                        </a>
                        <a href="#" className={`${styles.box}`}>
                            <i className={`fab fa-soundcloud ${styles.icon}`}></i>
                        </a>
                        <a href="#" className={`${styles.box}`}>
                            <i className={`fab fa-twitter ${styles.icon}`}></i>
                        </a>
                        <a href="#" className={`${styles.box}`}>
                            <i className={`fab fa-instagram ${styles.icon}`}></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
