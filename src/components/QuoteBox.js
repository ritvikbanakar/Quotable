import "./QuoteBox.css"

const QuoteBox = (props) => {

    const { email, title, highlight } = props

    return (
        <>
            <div className="quote-container">
                <p className="name">{email}</p>
                <p className="quote">{highlight}</p>
                <div className="book-info">
                    <p className="book-title">Title: {title}</p>
                    {/* <p className="book-author">N/A</p> */}
                </div>
            </div>
        </>
    )
}

export default QuoteBox