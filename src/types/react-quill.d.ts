declare module 'react-quill-new' {
    import React from 'react';
    
    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        placeholder?: string;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        className?: string;
        ref?: any;
    }

    export default class ReactQuill extends React.Component<ReactQuillProps> {
        getEditor(): any;
    }
}