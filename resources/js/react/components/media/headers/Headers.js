import styles from './headers.module.scss'

function Headers(props) {
    return (
        <div>
            <h1 className={`text-uppercase text-center of-text-secondary`}>{props.title}</h1>
            <hr className={styles.line}/>
        </div>
    )
}

export default Headers
