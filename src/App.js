import React from 'react';
import ReactDOM from 'react-dom';
import '@nuxeo/nuxeo-elements/nuxeo-connection';
import '@nuxeo/nuxeo-elements/nuxeo-document';
import '@nuxeo/nuxeo-elements/nuxeo-page-provider';
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-file';
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-document-suggestion';
import './nuxeo-documents-table';

import logo from './logo.svg';
import './App.css';

import {RoutingBehavior} from '@nuxeo/nuxeo-ui-elements/nuxeo-routing-behavior';
// define legacy router for elements using `nuxeo-router-behavior`
RoutingBehavior.__router = {
    browse() {
        return '#';
    },
};

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.currentRef = null;
        this.currentDoc = null;
        this.currentPath = null;

        this.setRef = element => {
            this.currentRef = element;
        };

        this.focusCurrentRef = () => {
            if (this.currentRef) {
                this.currentRef.focus();
                this.currentRef.addEventListener('selected-item-changed', (e) => {
                    this.selectDoc(e);
                });
            }
        };

        this.selectDoc = (e) => {
            let element = <h2>&nbsp;</h2>;
            if (e && e.detail && e.detail.value) {
                this.currentDoc = e.detail.value;
                this.currentPath = e.detail.value.path;
                const contributors = this.currentDoc.properties['dc:contributors'];
                element = (
                    <div>
                        <h2>Title: {this.currentDoc.title}</h2>
                        <p>ID: {this.currentDoc.uid}</p>
                        <p>Repository: {this.currentDoc.repository}</p>
                        <p>State: {this.currentDoc.state}</p>
                        <div>{contributors}</div>
                    </div>);
            } else {
                this.currentPath = this.currentDoc = undefined;
            }

            ReactDOM.render(element, document.getElementById('selectedDoc'));
        }
    }

    componentDidMount() {
        this.focusCurrentRef();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                <nuxeo-connection url="http://localhost:8080/nuxeo"></nuxeo-connection>

                <nuxeo-document-suggestion
                    placeholder="Select a document"
                    ref={this.setRef}>
                </nuxeo-document-suggestion>

                <nuxeo-document
                    auto
                    doc-path="{currentPath}"></nuxeo-document>

                <div id="selectedDoc"></div>

            </div>
        );
    }
}

export default AppComponent;
