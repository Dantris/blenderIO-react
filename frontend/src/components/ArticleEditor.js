import React, { useState, useCallback } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import api from "../api";

import "../styles/ArticleEditor.css"

function ArticleEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const uploadImageCallBack = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);
            api.post('/uploadImage', formData)
                .then(response => {
                    resolve({ data: { link: response.data.url } });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }, []);

    const getHtml = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };

    const handlePublish = async () => {
        const content = getHtml();  // Ensure this returns valid HTML or JSON string
        console.log("Content to be published:", content);  // Check what is being sent
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in!');
            return;
        }
    
        try {
            const response = await api.post('/articles', {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Article published:', response.data);
            alert('Article published successfully!');
        } catch (error) {
            console.error('Error publishing article:', error);
            alert('Failed to publish article.');
        }
    };
    
    

    return (
        <div className="editor-container">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                className="article-title-input"
            />
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    inline: {
                        inDropdown: false,
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                    },
                    blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                        className: 'bordered-option-classname',
                    },
                    fontFamily: {
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                        className: 'bordered-option-classname',
                    },
                    list: {
                        inDropdown: false,
                        className: 'bordered-option-classname',
                        options: ['unordered', 'ordered', 'indent', 'outdent'],
                    },
                    textAlign: {
                        inDropdown: false,
                        options: ['left', 'center', 'right', 'justify'],
                    },
                    colorPicker: {
                        colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                 'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)',
                                 'rgb(0,168,133)', 'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)',
                                 'rgb(40,50,78)', 'rgb(0,0,0)', 'rgb(247,218,100)', 'rgb(251,160,38)',
                                 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)', 'rgb(239,239,239)',
                                 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                 'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                    },
                    link: {
                        inDropdown: false,
                        showOpenOptionOnHover: true,
                        defaultTargetOption: '_self',
                        options: ['link', 'unlink'],
                    },
                    emoji: {
                        emojis: [
                            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊',
                            '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
                            '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜',
                            '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞',
                            '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣',
                            '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯',
                        ],
                    },
                    embedded: {
                        defaultSize: {
                            height: 'auto',
                            width: 'auto',
                        },
                    },
                    image: { 
                        uploadCallback: uploadImageCallBack,
                        alt: { present: true, mandatory: true },
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                        defaultSize: {
                            height: 'auto',
                            width: 'auto',
                        },
                    },
                }}
            />
            <button onClick={handlePublish} className="publish-button">Publish Article</button>
            <div>
                <h4>HTML Output:</h4>
                <div dangerouslySetInnerHTML={{ __html: getHtml() }} />
            </div>
        </div>
    );
}

export default ArticleEditor;