import React, { useRef, useState, useEffect } from 'react';

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
};

const RichTextEditor: React.FC<Props> = ({ value = '', onChange, placeholder, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [html, setHtml] = useState(value);

  useEffect(() => {
    setHtml(value);
  }, [value]);

  useEffect(() => {
    if (ref.current && html !== ref.current.innerHTML) {
      ref.current.innerHTML = html;
    }
  }, [html]);

  const exec = (command: string, valueArg?: string) => {
    try {
      // @ts-ignore legacy API
      document.execCommand(command, false, valueArg || undefined);
    } catch (e) {
      console.warn('execCommand failed', e);
    }
    emitChange();
  };

  const emitChange = () => {
    const newHtml = ref.current?.innerHTML || '';
    setHtml(newHtml);
    onChange?.(newHtml);
  };

  return (
    <div className={className}>
      <div className="editor-toolbar mb-2 flex gap-2">
        <button type="button" onClick={() => exec('bold')} className="btn">Bold</button>
        <button type="button" onClick={() => exec('italic')} className="btn">Italic</button>
        <button type="button" onClick={() => exec('underline')} className="btn">Underline</button>
        <button type="button" onClick={() => exec('insertUnorderedList')} className="btn">• List</button>
        <button type="button" onClick={() => exec('insertOrderedList')} className="btn">1. List</button>
        <button type="button" onClick={() => {
          const url = prompt('Enter URL') || '';
          if (url) exec('createLink', url);
        }} className="btn">Link</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        className="prose max-w-full p-3 border rounded min-h-[160px] bg-white text-black"
        data-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
};

export default RichTextEditor;
