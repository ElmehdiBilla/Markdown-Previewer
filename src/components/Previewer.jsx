import { ArrowsAngleContract, ArrowsAngleExpand } from "react-bootstrap-icons"

function Previewer({settings , makeFullSc , html}) {
    let isfullScreen = settings.fullscreen === 'pr' ? true : false;
    const preview = settings.preview;

    const fullSc = () => {
        isfullScreen = !isfullScreen
        makeFullSc(isfullScreen ? 'pr' : '')
    }

    const className = `${!preview || settings.fullscreen === 'ed' ? 'hidden' : ''} ${isfullScreen ? 'fullscreen' : ''}`;

    return (
    <div id="preview-container" className={className}>
        <div className="toolbar" >
            <button onClick={fullSc}>
                {
                    isfullScreen ?
                    <ArrowsAngleContract/>
                    :
                    <ArrowsAngleExpand/>
                }
            </button>
        </div>
        <div id="preview" dangerouslySetInnerHTML={{__html:html}} />
    </div>
    )
}

export default Previewer
