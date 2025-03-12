import { CloudArrowDown, FiletypeHtml, FiletypeMd, ImageFill } from "react-bootstrap-icons"
import { useDispatch } from "react-redux";
import { download, togglePreview } from "../store/store";
import { useState } from "react";

function Controls() {
    const [downloadDropdown,setDownloadDropdown] = useState(false);
    const dispatch = useDispatch();

    const toggleDropDown = () => {setDownloadDropdown(prevS => !prevS)}

    const downloadDropdownClassName = `downloads-centent ${!downloadDropdown ? 'hidden' : ''}`

    return (
        <div id="controls">
            <button onClick={() => {dispatch(togglePreview())}}>
                <ImageFill/>
            </button>
            <div className="downloads-dropdown dropdown">
                <button onClick={toggleDropDown} className="dropdown-toggle" >
                    <CloudArrowDown/>
                </button>
                <div className={downloadDropdownClassName}>
                    <button onClick={() => {dispatch(download('markdown'))}}>
                        markdown
                        <FiletypeMd/>
                    </button>
                    <hr/>
                    <button onClick={() => {dispatch(download('html'))}}>
                        HTML
                        <FiletypeHtml/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Controls