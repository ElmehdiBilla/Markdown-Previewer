import { ArrowsAngleContract, ArrowsAngleExpand, Trash } from "react-bootstrap-icons"

function Editor({settings , makeFullSc , markdown , onChange , clearMarkdown}) {
    let isfullScreen = settings.fullscreen === 'ed' ? true : false;
    const preview = settings.preview;

    const fullSc = () => {
        isfullScreen = !isfullScreen
        makeFullSc(isfullScreen ? 'ed' : '')
    }

    const className = `${settings.fullscreen === 'pr' ? 'hidden' : ''} ${isfullScreen ? 'fullscreen' : ''} ${!preview ? 'expand' : ''}` ;

    return (
        <div id="editor-container" className={className}>
            <div className="toolbar" >
                <button onClick={clearMarkdown}>
                    <Trash/>
                </button>
                <button onClick={fullSc}>
                    {
                        isfullScreen ?
                        <ArrowsAngleContract/>
                        :
                        <ArrowsAngleExpand/>
                    }
                </button>
            </div>
            <textarea 
                id="editor" 
                value={markdown} 
                onChange={onChange}>
            </textarea>
        </div>
    )
}

export default Editor
