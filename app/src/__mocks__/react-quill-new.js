import React from 'react';

const ReactQuill = React.forwardRef(({ value, onChange, theme, modules, formats, placeholder }, ref) => (
  <div data-testid="react-quill-mock" className="rich-text-editor">
    <textarea
      data-testid="quill-editor"
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
));

ReactQuill.displayName = 'ReactQuill';

export default ReactQuill;
