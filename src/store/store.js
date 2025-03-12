
import { marked } from 'marked';
import {createStore} from 'redux'
import markdownText from '../markdown.md?raw';

const GET_MARKDOWN = 'GET_MARKDOWN';
const CLEAR_MARKDOWN = 'PARSE_MARKDOWN';
const FULLSCREEN = 'FULLSCREEN';
const PREVIEW = 'PREVIEW';
const DOWNLOAD = 'DOWNLOAD';


export const makeFullScreen = (el) => {
    return {
        type:FULLSCREEN,
        element:el
    }
}

export const togglePreview = () => {
    return {
        type:PREVIEW,
    }
}

export const getMarkdown = (text) => {
    return {
        type:GET_MARKDOWN,
        text:text
    }
}

const parseMarkdown = (text) => {
    return marked.parse(text ,{breaks:true})
}

export const clearMarkdown = () => {
    return {
        type:CLEAR_MARKDOWN,
    }
}

export const download = (fileType) => {
    return {
        type:DOWNLOAD,
        fileType:fileType
    }
}

const downloadFile = (content, fileType, fileExtention) => {
    if(content){
        const blob = new Blob([content], {type: fileType});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file'+fileExtention;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }else{
        alert("You haven't written any content yet.");
    }
}

const makeSettings = (preview = false, fullScreen = '') => {
    return {
        preview:preview,
        fullscreen:fullScreen
    } 
}

const defaultState = {
    settings:{
        preview : true,
        fullscreen:''
    },
    markdown:markdownText,
    html: parseMarkdown(markdownText),
}


const parseReducer = (state = defaultState, action) => {
    switch(action.type){

        case GET_MARKDOWN:
            return {
                settings:state.settings,
                markdown: action.text,
                html:parseMarkdown(action.text)
            }

        case CLEAR_MARKDOWN:
            return {
                settings:state.settings,
                markdown: '',
                html:''
            }

        case FULLSCREEN:
            return {
                settings:makeSettings(state.settings.preview, action.element),
                markdown: state.markdown,
                html:state.html
            }

        case PREVIEW:
            return {
                settings:makeSettings(!state.settings.preview, action.element),
                markdown: state.markdown,
                html:state.html
            }
        case DOWNLOAD:
            let content = '';
            let fileType = '';
            let fileExt = '';

            if(action.fileType === 'markdown'){
                content = state.markdown;
                fileType = 'text/markdown';
                fileExt = '.md';
            }else if(action.fileType === 'html'){
                content = state.html;
                fileType = 'text/html';
                fileExt = '.html';
            }
            downloadFile(content,fileType,fileExt);
            return state

        default:
            return state;
    }
}

const store = createStore(parseReducer);

export default store