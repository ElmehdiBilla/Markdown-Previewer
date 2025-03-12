import { useState } from "react";
import { CloudArrowDown, FiletypeHtml, FiletypeMd, ImageFill } from "react-bootstrap-icons"

function Controls({settings , changeSettings , download}) {
    const [downloadDropdown,setDownloadDropdown] = useState(false);
    const preview = settings.preview;

    const togglePreview = () => {
        const settings = {
            preview : !preview
        }
        changeSettings(settings)
    }

    const downloadDropdownClassName = `downloads-centent ${!downloadDropdown ? 'hidden' : ''}`

    return (
        <div id="controls">
            <button onClick={togglePreview}>
                <ImageFill/>
            </button>
            <div className="downloads-dropdown">
                <button onClick={() => {setDownloadDropdown(prevS => !prevS)}}>
                    <CloudArrowDown/>
                </button>
                <div className={downloadDropdownClassName}>
                    <button onClick={() => {download('markdown') ; setDownloadDropdown(false)}}>
                        markdown
                        <FiletypeMd/>
                    </button>
                    <hr/>
                    <button onClick={() => {download('html') ; setDownloadDropdown(false)}}>
                        HTML
                        <FiletypeHtml/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Controls