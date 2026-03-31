/**
 * @file components/RichTextEditor/RichTextEditor.tsx
 * @author leon.wang
 */
import React, { FC, useRef, useEffect, useCallback, useState } from 'react';
import { Tooltip, Popover } from '@derbysoft/neat-design';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UndoOutlined,
  RedoOutlined,
  ClearOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import './RichTextEditor.scss';

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48'];

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
  '#ff0000', '#ff4500', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#1a73e8', '#9900ff',
  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd',
];

const EMOJIS = [
  '😀', '😂', '🤣', '😍', '🥰', '😎', '🤔', '😅',
  '👍', '👎', '👏', '🙏', '🤝', '✌️', '🖐️', '💪',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
  '🎉', '🎊', '🎈', '🚀', '⭐', '🌟', '💯', '🔥',
  '🌈', '☀️', '🌙', '⚡', '🌊', '🌸', '🍎', '🍕',
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  /** Initial HTML content */
  defaultValue?: string;
  /** Controlled HTML content */
  value?: string;
  /** Called when content changes, returns inner HTML string */
  onChange?: (html: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Editor height in px */
  height?: number;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Additional className */
  className?: string;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

interface ToolbarBtnProps {
  title: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarBtn: FC<ToolbarBtnProps> = ({ title, active, onClick, children }) => (
  <Tooltip title={title} placement="top">
    <button
      type="button"
      className={`rte-toolbar__btn${active ? ' rte-toolbar__btn--active' : ''}`}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent editor blur before execCommand
        onClick();
      }}
    >
      {children}
    </button>
  </Tooltip>
);

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * RichTextEditor — a dependency-free rich text editor built on contenteditable.
 * Supports bold/italic/underline/strikethrough, font size, text color, alignment,
 * ordered/unordered lists, and a preset emoji picker.
 */
const RichTextEditor: FC<RichTextEditorProps> = ({
  defaultValue = '',
  value,
  onChange,
  placeholder = '请输入内容...',
  height = 240,
  readOnly = false,
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const isControlled = value !== undefined;

  // Track active formats for toolbar highlight
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState('16');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('transparent');
  const [emojiOpen, setEmojiOpen] = useState(false);

  // Initialize content
  useEffect(() => {
    if (editorRef.current && defaultValue && !isControlled) {
      editorRef.current.innerHTML = defaultValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync controlled value
  useEffect(() => {
    if (isControlled && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value ?? '';
    }
  }, [isControlled, value]);

  // Save selection before toolbar interaction (called on selectionchange)
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  // Restore saved selection
  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    } else {
      editorRef.current?.focus();
    }
  }, []);

  // Execute a document.execCommand and refresh toolbar state
  const exec = useCallback(
    (command: string, value?: string) => {
      restoreSelection();
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateToolbarState();
      triggerChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const triggerChange = useCallback(() => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const updateToolbarState = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    });
    const size = document.queryCommandValue('fontSize');
    if (size) {
      // execCommand fontSize uses 1–7, map back from pt values
      const ptMap: Record<string, string> = {
        '1': '10', '2': '13', '3': '16', '4': '18', '5': '24', '6': '32', '7': '48',
      };
      setFontSize(ptMap[size] ?? '16');
    }
    const color = document.queryCommandValue('foreColor');
    if (color) setTextColor(rgbToHex(color));
  }, []);

  // Insert emoji at cursor position
  const insertEmoji = useCallback(
    (emoji: string) => {
      restoreSelection();
      document.execCommand('insertText', false, emoji);
      editorRef.current?.focus();
      triggerChange();
      setEmojiOpen(false);
    },
    [restoreSelection, triggerChange]
  );

  // Font size uses execCommand 1–7 scale; map px → level
  const applyFontSize = useCallback(
    (px: string) => {
      const levels: Record<string, string> = {
        '10': '1', '12': '1', '13': '2', '14': '2',
        '16': '3', '18': '4', '20': '4', '24': '5',
        '28': '5', '32': '6', '36': '6', '48': '7',
      };
      const level = levels[px] ?? '3';
      setFontSize(px);
      exec('fontSize', level);
    },
    [exec]
  );

  const applyColor = useCallback(
    (color: string) => {
      setTextColor(color);
      exec('foreColor', color);
    },
    [exec]
  );

  const applyBgColor = useCallback(
    (color: string) => {
      setBgColor(color);
      // hiliteColor applies background color to selected text
      exec('hiliteColor', color);
    },
    [exec]
  );

  // ── Background color picker popover content
  const bgColorPicker = (
    <div className="rte-color-picker">
      {/* Transparent / clear option */}
      <button
        type="button"
        className={`rte-color-picker__swatch rte-color-picker__swatch--transparent${bgColor === 'transparent' ? ' rte-color-picker__swatch--active' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault();
          applyBgColor('transparent');
        }}
        title="清除背景色"
      />
      {COLORS.filter((c) => c !== '#000000').map((c) => (
        <button
          key={c}
          type="button"
          className={`rte-color-picker__swatch${c === bgColor ? ' rte-color-picker__swatch--active' : ''}`}
          style={{ background: c }}
          onMouseDown={(e) => {
            e.preventDefault();
            applyBgColor(c);
          }}
        />
      ))}
    </div>
  );

  // ── Color picker popover content
  const colorPicker = (
    <div className="rte-color-picker">
      {COLORS.map((c) => (
        <button
          key={c}
          type="button"
          className={`rte-color-picker__swatch${c === textColor ? ' rte-color-picker__swatch--active' : ''}`}
          style={{ background: c }}
          onMouseDown={(e) => {
            e.preventDefault();
            applyColor(c);
          }}
        />
      ))}
    </div>
  );

  // ── Emoji picker popover content
  const emojiPicker = (
    <div className="rte-emoji-picker">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className="rte-emoji-picker__item"
          onMouseDown={(e) => {
            e.preventDefault();
            insertEmoji(emoji);
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`rte ${className}`}>
      {/* ── Toolbar ── */}
      {!readOnly && (
        <div className="rte-toolbar">
          {/* History */}
          <ToolbarBtn title="撤销 (Ctrl+Z)" onClick={() => exec('undo')}>
            <UndoOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="重做 (Ctrl+Y)" onClick={() => exec('redo')}>
            <RedoOutlined />
          </ToolbarBtn>

          <span className="rte-toolbar__divider" />

          {/* Inline formats */}
          <ToolbarBtn title="加粗 (Ctrl+B)" active={activeFormats.bold} onClick={() => exec('bold')}>
            <BoldOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="斜体 (Ctrl+I)" active={activeFormats.italic} onClick={() => exec('italic')}>
            <ItalicOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="下划线 (Ctrl+U)" active={activeFormats.underline} onClick={() => exec('underline')}>
            <UnderlineOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="删除线" active={activeFormats.strikeThrough} onClick={() => exec('strikeThrough')}>
            <StrikethroughOutlined />
          </ToolbarBtn>

          <span className="rte-toolbar__divider" />

          {/* Font size */}
          <Tooltip title="字体大小" placement="top">
            <select
              className="rte-toolbar__select"
              value={fontSize}
              onMouseDown={saveSelection}
              onChange={(e) => applyFontSize(e.target.value)}
            >
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </Tooltip>

          {/* Text color */}
          <Popover
            content={colorPicker}
            trigger="click"
            placement="bottomLeft"
          >
            <Tooltip title="文字颜色" placement="top">
              <button
                type="button"
                className="rte-toolbar__color-btn"
                onMouseDown={saveSelection}
              >
                <span className="rte-toolbar__color-btn-text">A</span>
                <span className="rte-toolbar__color-indicator" style={{ background: textColor }} />
              </button>
            </Tooltip>
          </Popover>

          {/* Background color */}
          <Popover
            content={bgColorPicker}
            trigger="click"
            placement="bottomLeft"
          >
            <Tooltip title="背景颜色" placement="top">
              <button
                type="button"
                className="rte-toolbar__color-btn"
                onMouseDown={saveSelection}
              >
                <span className="rte-toolbar__color-btn-text" style={{ fontSize: 11 }}>bg</span>
                <span
                  className="rte-toolbar__color-indicator"
                  style={{
                    background: bgColor === 'transparent' ? 'linear-gradient(135deg, #fff 45%, #f00 45%, #f00 55%, #fff 55%)' : bgColor,
                    border: '1px solid rgba(0,0,0,0.15)',
                  }}
                />
              </button>
            </Tooltip>
          </Popover>

          <span className="rte-toolbar__divider" />

          {/* Alignment */}
          <ToolbarBtn title="左对齐" active={activeFormats.justifyLeft} onClick={() => exec('justifyLeft')}>
            <AlignLeftOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="居中" active={activeFormats.justifyCenter} onClick={() => exec('justifyCenter')}>
            <AlignCenterOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="右对齐" active={activeFormats.justifyRight} onClick={() => exec('justifyRight')}>
            <AlignRightOutlined />
          </ToolbarBtn>

          <span className="rte-toolbar__divider" />

          {/* Lists */}
          <ToolbarBtn title="有序列表" active={activeFormats.insertOrderedList} onClick={() => exec('insertOrderedList')}>
            <OrderedListOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="无序列表" active={activeFormats.insertUnorderedList} onClick={() => exec('insertUnorderedList')}>
            <UnorderedListOutlined />
          </ToolbarBtn>

          <span className="rte-toolbar__divider" />

          {/* Emoji */}
          <Popover
            content={emojiPicker}
            trigger="click"
            open={emojiOpen}
            onOpenChange={(v) => {
              if (v) saveSelection();
              setEmojiOpen(v);
            }}
            placement="bottomLeft"
          >
            <Tooltip title="插入表情" placement="top">
              <button
                type="button"
                className="rte-toolbar__btn"
                onMouseDown={saveSelection}
              >
                <SmileOutlined />
              </button>
            </Tooltip>
          </Popover>

          {/* Clear formatting */}
          <ToolbarBtn title="清除格式" onClick={() => exec('removeFormat')}>
            <ClearOutlined />
          </ToolbarBtn>
        </div>
      )}

      {/* ── Editor area ── */}
      <div
        ref={editorRef}
        className={`rte-content${readOnly ? ' rte-content--readonly' : ''}`}
        contentEditable={!readOnly}
        suppressContentEditableWarning
        style={{ minHeight: height }}
        data-placeholder={placeholder}
        onInput={triggerChange}
        onKeyUp={updateToolbarState}
        onMouseUp={updateToolbarState}
        onSelect={saveSelection}
      />
    </div>
  );
};

export default RichTextEditor;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert rgb(r,g,b) string returned by queryCommandValue to #rrggbb */
function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb;
  return (
    '#' +
    [match[1], match[2], match[3]]
      .map((n) => parseInt(n).toString(16).padStart(2, '0'))
      .join('')
  );
}
