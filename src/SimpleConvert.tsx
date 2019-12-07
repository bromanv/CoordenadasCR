import React, { Component } from 'react'
import { GeoReferenceSystem } from './GeoReferenceSystem';
import Dropdown from 'react-dropdown'
import proj4 from 'proj4';
import { number, string, array } from 'prop-types';

interface SimpleConvertState {
    dropDownOptions: GeoReferenceSystem[],
    from?: GeoReferenceSystem,
    to?: GeoReferenceSystem,
    result?: string,
    valuesToConvert?: string;
}
class SimpleConvert extends Component<{}, SimpleConvertState> {
    constructor(props: any) {
        super(props)
        this.state = {
            dropDownOptions: GeoReferenceSystem.GetArray()
        }
        this._onDropdownSelect = this._onDropdownSelect.bind(this);
        this._onDropdown1Select = this._onDropdown1Select.bind(this);
        this._onDropdown2Select = this._onDropdown2Select.bind(this);
        this._onTextChange = this._onTextChange.bind(this);
        this._onClick = this._onClick.bind(this);
    }
    _onDropdown1Select(option: any) {
        this._onDropdownSelect(option, "from");
    }
    _onDropdown2Select(option: any) {
        this._onDropdownSelect(option, "to");
    }
    _onDropdownSelect(option: GeoReferenceSystem, propertyName: string) {
        let newState: any;
        newState = this.state;
        newState[propertyName] = option;
        this.setState(newState)
    }
    _onTextChange(option: any) {
        this.setState({ valuesToConvert: option.target.value });
    }
    _onClick() {
        this.setState({
            result: this._computeResult(
                this.state.from,
                this.state.to,
                this.state.valuesToConvert)
        });
    }
    _computeResult(from?: GeoReferenceSystem, to?: GeoReferenceSystem, value?: string): string {
        if (from == null || to == null || value == null) {
            return "";
        }
        let coordenates: number[] = [];
        value.split(";").forEach(s => {
            coordenates.push(parseFloat(s));
        });
        let result = "";
        try {
            result = proj4(from.value, to.value).forward(coordenates).join(" ");
        }
        catch (ex) {
            result = "error";
        }
        return result;
    }
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">From</div>
                        <div className="col-sm">Values</div>
                        <div className="col-sm">To</div>
                        <div className="col-sm">Result</div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <Dropdown options={this.state.dropDownOptions} onChange={this._onDropdown1Select} value={this.state.from} placeholder="Select an option" />
                        </div>
                        <div className="col-sm">
                            <input type="text" onChange={this._onTextChange} value={this.state.valuesToConvert} />
                        </div>
                        <div className="col-sm">
                            <Dropdown options={this.state.dropDownOptions} onChange={this._onDropdown2Select} value={this.state.to} placeholder="Select an option" />
                        </div>
                        <div className="col-sm">{this.state.result}</div>
                    </div>
                    <div className="row" style={{ "margin": "5px" }}></div>
                    <div className="row">
                        <div className="col-sm">
                            <button onClick={this._onClick}>procesar</button>
                        </div>
                    </div>
                    <br/>
                    <h4>Ejemplos</h4>
                    <div className="row">
                        <div className="col-sm"><b>Lambert Norte</b></div>
                        <div className="col-sm">Primero E y luego N ejemplo: 621745.274;226213.731</div>
                    </div>                   
                    <hr/>
                    <div className="row">
                        <div className="col-sm"><b>Lambert Sur</b></div>
                        <div className="col-sm">Primero E y luego N ejemplo: 548671.609;444408.109</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm"><b>CRTM05 (en el CU dice CR-05)</b></div>
                        <div className="col-sm">Primero E y luego N ejemplo: 585412;1111479</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm"><b>WGS84 (en el CU dice Coordenadas Geografica Grados decimales)</b></div>
                        <div className="col-sm">Primero Longitud y luego Latitud ejemplo: -83.22079088033789;10.050937762233895</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SimpleConvert