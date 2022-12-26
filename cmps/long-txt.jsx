const { useState } = React

export function LongTxt({ txt, length}) {

    const [isReadMore, setIsReadMore] = useState(true)

    // const toggleReadMore = () => {
    //     setIsReadMore(!isReadMore)
    // }

    const toggleReadMore = () => {
        setIsReadMore((prevIsReadMore) => !prevIsReadMore)
    }

    return (
        <p className="txt">
            {isReadMore ? txt.slice(0, length) : txt}
            <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...read more" : " read less"}
            </span>
        </p>
    )

}