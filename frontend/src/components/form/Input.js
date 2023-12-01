    import styles from './Input.module.css';

    function Input({type, text, name, placeholder, handleOnChange, value, multiple}) {

        if(type === "textarea") {
            return (
                <div className={styles.form_control}>
                    <label htmlFor={name}> {text} </label>
                    <textarea
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        onChange={handleOnChange}
                        value={value}
                    ></textarea>
                </div>
            )
        }

        return (
            <div className={styles.form_control}>
                <label htmlFor={name}>{text}:</label>
                <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange}
                value={value} {...(multiple) ? {multiple} : ''}></input> 
            </div>
        );
    }

    export default Input;