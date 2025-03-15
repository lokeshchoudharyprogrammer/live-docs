'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from '@/store/use-editor-store'
import UnderLine from "@tiptap/extension-underline"
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSizeExtenstion } from '@/extensions/font-size'
import { LineHeightExtenstion } from '@/extensions/line-height'
import Ruler from './ruler'
import {Threads} from "./threads"
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";


const Editor = () => {

    const { setEditor } = useEditorStore();
    const liveblocks = useLiveblocksExtension();
    
    const editor = useEditor({
        // inmmediatelyRender:false ,// Fix Later SSR
        immediatelyRender:false,
        onCreate({ editor }) {
            setEditor(editor)
        },
        onDestroy() {
            setEditor(null)
        },
        onUpdate({editor}) {
            setEditor(editor)
        },
        onSelectionUpdate({editor}) {
            setEditor(editor)
        },
        onTransaction({editor}) {
            setEditor(editor)
        },
        onFocus({editor}) {
            setEditor(editor)
        },
        onBlur({editor}) {
            setEditor(editor)
        },
        onContentError({editor}) {
            setEditor(editor)
        },
        editorProps: {
            attributes: {
                style: "padding-left:56px; padding-right:56px",
                class: "focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr14 pb-10 cursor-text"
            }
        },
        extensions: [
            liveblocks,
            LineHeightExtenstion.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight:"normal"
              }),
            FontSizeExtenstion,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
              }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',               
        
              }),
            Highlight.configure({ multicolor: true }),
            Color,
            TextStyle,
            FontFamily,
            UnderLine,
            StarterKit.configure({
                // The Liveblocks extension comes with its own history handling
                history: false,
              }),
            TaskItem.configure({
                nested: true,
            }),
            TaskList,
            Document,
            Paragraph,
            Text,
            Gapcursor,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            Dropcursor,
            ImageResize
        ]
        ,
        content: `
        
        `,
    })

    return (
        <div className="min-h-screen bg-[#FAFBFD] px-4 print:p-0 print:bg-white print:overflow-visible"  >
           <Ruler/>
            <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 '>
                <EditorContent editor={editor} />
                <Threads editor={editor} />
           
            </div>
        </div>
    )
}

export default Editor