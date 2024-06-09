import css from "./ErrorMessage.module.css"

const ErrorMessage = () => {
    return <p className={css.error}>Error while fetching images from Unsplash!</p>
}

export default ErrorMessage