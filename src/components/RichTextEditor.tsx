import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, placeholder }: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showTableOptions, setShowTableOptions] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'tiptap-table-header',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'tiptap-table-cell',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[300px] p-4 rounded border border-white/10 bg-transparent text-gray-100 focus:outline-none',
      },
    },
  })

  if (!editor) {
    return null
  }

  const insertTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    setShowTableOptions(false)
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-gray-900 relative">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-gray-800">
        {/* Font Size */}
        <select
          onChange={(e) => {
            const size = e.target.value
            if (size) {
              editor.chain().focus().setFontSize(size).run()
            } else {
              editor.chain().focus().unsetFontSize().run()
            }
          }}
          className="px-2 py-1 text-xs bg-gray-700 text-white border border-gray-600 rounded"
        >
          <option value="">Size</option>
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>

        {/* Font Family */}
        <select
          onChange={(e) => {
            const family = e.target.value
            if (family) {
              editor.chain().focus().setFontFamily(family).run()
            } else {
              editor.chain().focus().unsetFontFamily().run()
            }
          }}
          className="px-2 py-1 text-xs bg-gray-700 text-white border border-gray-600 rounded"
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Courier New">Courier</option>
          <option value="Verdana">Verdana</option>
        </select>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Bold, Italic, Underline - ALL BUTTONS NOW HAVE type="button" */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('bold')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('italic')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('underline')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('strike')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <s>S</s>
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Text Color */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-2 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
          >
            A
          </button>
          {showColorPicker && (
            <div className="absolute top-8 left-0 z-20 bg-gray-800 border border-gray-600 rounded p-3">
              <HexColorPicker
                color={editor.getAttributes('textStyle').color || '#000000'}
                onChange={(newColor) => {
                  editor.chain().focus().setColor(newColor).run()
                }}
              />
              <button
                type="button"
                onClick={() => setShowColorPicker(false)}
                className="mt-2 w-full px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Highlight */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHighlightPicker(!showHighlightPicker)}
            className="px-2 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
          >
            ⚡
          </button>
          {showHighlightPicker && (
            <div className="absolute top-8 left-0 z-20 bg-gray-800 border border-gray-600 rounded p-3">
              <HexColorPicker
                color={editor.getAttributes('highlight').color || '#ffff00'}
                onChange={(newColor) => {
                  editor.chain().focus().toggleHighlight({ color: newColor }).run()
                }}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run()
                    setShowHighlightPicker(false)
                  }}
                  className="flex-1 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowHighlightPicker(false)}
                  className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTableOptions(!showTableOptions)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              editor.isActive('table')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ┬─┬
          </button>
          {showTableOptions && (
            <div className="absolute top-8 left-0 z-20 bg-gray-800 border border-gray-600 rounded p-3 min-w-[200px]">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-white mb-2">Insert Table</h4>
                <div className="grid grid-cols-3 gap-1">
                  {[2, 3, 4].map(rows => 
                    [2, 3, 4].map(cols => (
                      <button
                        key={`${rows}x${cols}`}
                        type="button"
                        onClick={() => insertTable(rows, cols)}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        {rows}×{cols}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {editor.isActive('table') && (
                <div className="border-t border-gray-600 pt-3">
                  <h4 className="text-sm font-medium text-white mb-2">Table Actions</h4>
                  <div className="space-y-1">
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().addRowBefore().run()}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        + Row Above
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().addRowAfter().run()}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        + Row Below
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().addColumnBefore().run()}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        + Col Left
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().addColumnAfter().run()}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        + Col Right
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().deleteRow().run()}
                        className="px-2 py-1 text-xs bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        - Row
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().deleteColumn().run()}
                        className="px-2 py-1 text-xs bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        - Col
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().deleteTable().run()}
                      className="w-full px-2 py-1 text-xs bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete Table
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowTableOptions(false)}
                className="mt-3 w-full px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive({ textAlign: 'left' })
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive({ textAlign: 'center' })
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          ↔
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive({ textAlign: 'right' })
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          →
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          •
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          1.
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
      
      {placeholder && !content && (
        <div className="absolute top-14 left-4 text-gray-500 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  )
}