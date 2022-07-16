import "./QuoteBox.css"

const QuoteBox = (props) => {

    const highlight = props

   

    return (
        <>
            <div className="quote-container"> 
                <p className="name">Max Sehaumpai</p>
                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                {/* <p className="quote">If it's not broken, don't fix it.</p> */}
                <div className="book-info">
                    <p className="book-title">The Lighting Thief</p>
                    <p className="book-author">Rick Riordan</p>
                </div>
            </div>
        </>
    )
}

export default QuoteBox