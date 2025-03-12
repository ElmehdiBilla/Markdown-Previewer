import Editor from './components/Editor'
import Previewer from './components/Previewer'
import {Provider} from 'react-redux'
import store from './store'
import { useEffect, useState } from 'react'
import { marked } from 'marked'
import markdownText from './markdown.md?raw'
import Controls from './components/Controls'

function App() {
  let init = false;
  const defSettings = {
    preview : true,
    fullscreen:''
  }
  const [settings ,setSettings] = useState(defSettings);
  const [markdown , setMarkdown] = useState();
  const [html, setHtml] =  useState();

  const onChange = (e) => {
    const text = e.target.value
    setMarkdown(text)
    setHtml(parseMarkdown(text));
  }

  const parseMarkdown = (markdown) => {
    return marked.parse(markdown,{breaks:true});
  }

  const clearMarkdown = () => {
    setMarkdown('')
    setHtml('')
  }

  const changeSettings = (settings) => {
    setSettings(prevS => {
      return {
        preview : settings.preview,
        fullscreen:prevS.fullscreen
      }
    })
  }

  const makeFullSc = (el) => {
    setSettings(prevS => {
        return {
          preview : prevS.preview,
          fullscreen:el
        }
    })
  }

  const download = (fileType) => {
    let fileToDownload = '';
    let fileExtension = '';
    if(fileType === 'markdown') {
      fileToDownload = markdown;
      fileExtension = 'md';
    }else if(fileType === 'html'){
      fileToDownload = html;
      fileExtension = 'html';
    }

    if(fileToDownload){
      const blob = new Blob([fileToDownload] , {type : `'text/${fileType}`});
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url;
      a.download = `file.${fileExtension}`
      document.body.appendChild(a)
      a.click();
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }else{
      alert("You haven't written any content yet.")
    }
  }

  useEffect(() => {
    if(init === false){
      init = true
      setMarkdown(markdownText)
      setHtml(parseMarkdown(markdownText));
    }
  },[])

  return (
    <Provider store={store}>
      <Controls settings={settings} changeSettings={changeSettings} download={download} />
      <main>
        <Editor settings={settings} makeFullSc={makeFullSc}  markdown={markdown} onChange={onChange} clearMarkdown={clearMarkdown} />
        <Previewer html={html} settings={settings} makeFullSc={makeFullSc} />
      </main>
    </Provider>
  )
}

export default App
