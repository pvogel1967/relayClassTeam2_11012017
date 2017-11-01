import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class CarViewRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        editing: false,
        make: '',
        model: '',
        year: 0,
        color: '',
        price: 0
    });

    onEditCar = () => {
        this.setState({
            editing: true,
            ...this.props.car
        });
    };

    onCancel = () => {
        this.setState({
            editing: false,
            ...this.props.car
        });
    };

    onChange = e => {

        this.setState({
            [ e.target.name ]: e.target.type === 'number'
                ? Number(e.target.value)
                : e.target.value,
        });
    };

    onSave = e => {
        this.props.onUpdateCar({
            id: this.props.car.id,
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        });

        // Since we are optimsitically updating, this is syncronous, so we can just set state
        this.setState({
            editing: false
        });
    };

    render() {

        if (!this.state.editing) {
        return <tr>
            <td>{this.props.car.make}</td>
            <td>{this.props.car.model}</td>
            <td>{this.props.car.year}</td>
            <td>{this.props.car.color}</td>
            <td>{this.props.car.price}</td>
            <td>
                <button type="button" onClick={() =>
                    this.onEditCar(this.state.id)}>Edit
                </button>
                <button type="button" onClick={() =>
                    this.props.onDeleteCar(this.state.id)}>Delete
                </button>
            </td>
        </tr>;
        }
        else {
            return <tr>
                <td><input type="text" id="make-input" name="make" value={this.state.make} onChange={this.onChange} /></td>
                <td><input type="text" id="model-input" name="model" value={this.state.model} onChange={this.onChange} /></td>
                <td><input type="text" id="year-input" name="year" value={this.state.year} onChange={this.onChange} /></td>
                <td><input type="text" id="color-input" name="color" value={this.state.color} onChange={this.onChange} /></td>
                <td><input type="text" id="price-input" name="price" value={this.state.price} onChange={this.onChange} /></td>
                <td>
                    <button type="button" onClick={() =>
                        this.onSave(this.state.id)}>Save
                    </button>
                    <button type="button" onClick={() =>
                        this.onCancel(this.state.id)}>Cancel
                    </button>
                </td>
            </tr>;
        }
    }
}

export const CarViewRowContainer = createFragmentContainer(CarViewRow, graphql`
  fragment carViewRow_car on Car {
    id make model year color price
  }
`);