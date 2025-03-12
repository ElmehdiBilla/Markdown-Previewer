import { ArrowsAngleContract, ArrowsAngleExpand } from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux";
import { makeFullScreen } from "../store/store";

function Previewer() {
    const fullscreen = useSelector(state => state.settings.fullscreen)
    const preview = useSelector(state => state.settings.preview);
    const html = useSelector(state => state.html);
    const dispatch = useDispatch();
    let isfullScreen = fullscreen === 'preview' ? true : false;

    const fullSc = () => {
        isfullScreen = !isfullScreen
        dispatch(makeFullScreen(isfullScreen ? 'preview' : ''))
    }


    const className = `${!preview || fullscreen === 'editor' ? 'hidden' : ''} ${isfullScreen ? 'fullscreen' : ''}`;

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
