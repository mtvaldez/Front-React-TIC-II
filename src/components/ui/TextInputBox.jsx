
function TextInputBox (props) {

    const inputType = props.inputType || "text";

    return (
        <div className="flex flex-col">
            <label htmlFor="textInput">{props.label}</label>
                <input
                type={inputType}
                id={props.myID}
                value={props.myValue}
                onChange={props.onChange}
                placeholder={props.myPlaceholder}
                 className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
        </div>
    );
}

export default TextInputBox;