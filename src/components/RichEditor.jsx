import React from 'react';
import { Jodit } from 'jodit';
import JoditReact from 'jodit-react';
import { fileUpload } from '../services/cloudinary.service';
import imgUpload from '../assets/images/upload-img.png';
import codeUpload from '../assets/images/code.png';
import LazyLoader from './LazyLoader';
import store from '../redux/store';
import { setLoading } from '../redux/slice/settingReducer';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorContent: '',
      load: false,
    };

    this.editorConfig = {
      readonly: false,
      toolbar: true,
      spellcheck: true,
      language: 'en',
      toolbarButtonSize: 'medium',
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      defaultActionOnPaste: 'insert_clear_html',
      height: 400,
      colors: {
        greyscale: [
          '#000000',
          '#434343',
          '#666666',
          '#999999',
          '#B7B7B7',
          '#CCCCCC',
          '#D9D9D9',
          '#EFEFEF',
          '#F3F3F3',
          '#FFFFFF',
        ],
        palette: [
          '#980000',
          '#FF0000',
          '#FF9900',
          '#FFFF00',
          '#00F0F0',
          '#00FFFF',
          '#4A86E8',
          '#0000FF',
          '#9900FF',
          '#FF00FF',
        ],
        full: [
          '#E6B8AF',
          '#F4CCCC',
          '#FCE5CD',
          '#FFF2CC',
          '#D9EAD3',
          '#D0E0E3',
          '#C9DAF8',
          '#CFE2F3',
          '#D9D2E9',
          '#EAD1DC',
          '#DD7E6B',
          '#EA9999',
          '#F9CB9C',
          '#FFE599',
          '#B6D7A8',
          '#A2C4C9',
          '#A4C2F4',
          '#9FC5E8',
          '#B4A7D6',
          '#D5A6BD',
          '#CC4125',
          '#E06666',
          '#F6B26B',
          '#FFD966',
          '#93C47D',
          '#76A5AF',
          '#6D9EEB',
          '#6FA8DC',
          '#8E7CC3',
          '#C27BA0',
          '#A61C00',
          '#CC0000',
          '#E69138',
          '#F1C232',
          '#6AA84F',
          '#45818E',
          '#3C78D8',
          '#3D85C6',
          '#674EA7',
          '#A64D79',
          '#85200C',
          '#990000',
          '#B45F06',
          '#BF9000',
          '#38761D',
          '#134F5C',
          '#1155CC',
          '#0B5394',
          '#351C75',
          '#733554',
          '#5B0F00',
          '#660000',
          '#783F04',
          '#7F6000',
          '#274E13',
          '#0C343D',
          '#1C4587',
          '#073763',
          '#20124D',
          '#4C1130',
        ],
      },
      buttons: [
        'source',
        '|',
        'bold',
        'strikethrough',
        'underline',
        'italic',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'video',
        'table',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'symbol',
        'fullsize',
        'print',
        'image',
      ],
      buttonsXS: ['bold', 'image', '|', 'brush', 'paragraph', '|', 'align', '|', 'undo', 'redo', '|', 'eraser', 'dots'],
      extraButtons: ['uploadImage', 'codeBlock'],
    };
  }

  componentWillMount() {
    this.uploadImageButton();
    this.codeBlockButton();
  }

  uploadImageButton = () => {
    Jodit.defaultOptions.controls.uploadImage = {
      name: 'Upload image to Cloudinary',
      iconURL: imgUpload,
      exec: async (editor) => {
        await this.imageUpload(editor);
      },
    };
  };

  codeBlockButton = () => {
    Jodit.defaultOptions.controls.codeBlock = {
      name: 'Code Block',
      iconURL: codeUpload,
      exec: async (editor) => {
        const pre = editor.selection.j.createInside.element('pre');
        pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px'; // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
        pre.innerHTML = `${editor.selection.html}`;
        editor.selection.insertNode(pre);
      },
    };
  };

  imageUpload = (editor) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async function () {
      const imageFile = input.files[0];

      if (!imageFile) {
        return;
      }

      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        return;
      }

      store.dispatch(setLoading(true));

      const imageInfo = await fileUpload(imageFile);

      this.insertImage(editor, imageInfo.url);

      if (imageInfo) {
        store.dispatch(setLoading(false));
      }
    }.bind(this);
  };

  insertImage = (editor, url) => {
    const image = editor.selection.j.createInside.element('img');
    image.setAttribute('src', url);
    editor.selection.insertNode(image);
  };

  render() {
    return (
      <React.Fragment>
        <JoditReact
          value={this.props.value}
          config={this.editorConfig}
          onChange={this.props.onChange}
          onBlur={(newContent) => this.setContent(newContent)}
        />
      </React.Fragment>
    );
  }
}

export default RichEditor;
