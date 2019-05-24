import React from 'react';
import logo from './logo.svg';
import './App.css';

import '@nuxeo/nuxeo-elements/nuxeo-connection'
import '@nuxeo/nuxeo-elements/nuxeo-document'
import '@nuxeo/nuxeo-elements/nuxeo-page-provider'
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-file'
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-document-suggestion'
import './nuxeo-documents-table'

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.suggestionRef = null;
    }

    componentDidMount() {
        this.suggestionRef.addEventListener('selected-item-changed', this.selectDoc.bind(this));
    }

    selectDoc(e) {
        this.setState(() => ({doc: e.detail.value}));
    }

    render() {
        const { doc } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                <nuxeo-connection url="/nuxeo"></nuxeo-connection>

                <nuxeo-document-suggestion
                    placeholder="Select a document"
                    ref={(el) => this.suggestionRef = el}>
                </nuxeo-document-suggestion>

                {doc &&
                    <div>
                        <h2>Title: {doc.title}</h2>
                        <p>ID: {doc.uid}</p>
                        <p>Repository: {doc.repository}</p>
                        <p>State: {doc.state}</p>
                        <div>{doc.properties['dc:contributors']}</div>
                    </div>
                }

            </div>
        );
    }
}

export default AppComponent;
