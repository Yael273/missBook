const { useState } = React

export function LongTxt({ txt, length = 100}) {

    const [isReadMore, setIsReadMore] = useState(true)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }
    return (
        <p className="txt">
            {isReadMore ? txt.slice(0, 100) : txt}
            <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...read more" : " read less"}
            </span>
        </p>
    )

}