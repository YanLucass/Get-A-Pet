import styles from './RoundImage.module.css'

function RoundImage({src, alt, width}) {
    return (
        <img  className={`${styles.rounded_image} ${styles[width]}`} src={src} alt={alt}/>
    )
}

export default RoundImage