import { ArrowsAngleContract, ArrowsAngleExpand, Trash } from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux";
import { clearMarkdown, getMarkdown, makeFullScreen } from "../store/store";

function Editor() {
    const fullscreen = useSelector(state => state.settings.fullscreen)
    const preview = useSelector(state => state.settings.preview);
    const markdown = useSelector(state => state.markdown);
    const dispatch = useDispatch();
    let isfullScreen = fullscreen === 'editor' ? true : false;

    const fullSc = () => {
        isfullScreen = !isfullScreen
        dispatch(makeFullScreen(isfullScreen ? 'editor' : ''))
    }

    const handleChange = (e) => {
        dispatch(getMarkdown(e.target.value))
    }

    const className = `${fullscreen === 'preview' ? 'hidden' : ''} ${isfullScreen ? 'fullscreen' : ''} ${!preview ? 'expand' : ''}` ;

    return (
        <div id="editor-container" className={className}>
            <div className="toolbar" >
                <button onClick={() => { dispatch(clearMarkdown()) }}>
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
                onChange={handleChange}>
            </textarea>
        </div>
    )
}

export default Editor
