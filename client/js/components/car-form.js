import * as React from 'react';

export class CarForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    make: '',
    model: '',
    models: [],
    year: 1900,
    color: '',
    colors: [],
    price: 0,
  });

  onChange = e => {
      this.setState({
          [ e.target.name ]: e.target.type === 'number'
              ? Number(e.target.value)
              : e.target.value,
      });
  }

  onChangeMake = e => {

      this.onChange(e);

      const selectedObject = this.props.carmakes.find((car) => {
         return car.node.name === e.target.value;
      });

      if (selectedObject) {
        this.setState({models: selectedObject.node.models});
          this.setState({colors: selectedObject.node.colors});
      }
  };

  onClick = () => {
      const car = {
          id: this.state.id,
          make: this.state.make,
          model: this.state.model,
          year: this.state.year,
          color: this.state.color,
          price: this.state.price
      };

      console.log(car);
    this.props.onSubmitCar(car).then(() => {
        this.props.onShowCarTable();
    });
    this.setState(this.getInitialState());
  };

  render() {
    return <form>
      <div>
        <label htmlFor="make-input">Make</label>
        <select id="make-input" name="make" onChange={this.onChangeMake}>
            <option value="">Select A Make</option>
            {
                this.props.carmakes.map(edge => {
                    return <option key={edge.node.id} value={edge.node.name}>{edge.node.name}</option>;
                })
            }

        </select>
      </div>
      <div>
        <label htmlFor="model-input">Model</label>
        <select id="model-input" name="model" onChange={this.onChange}>
            {
                this.state.models.map(model => {
                    return <option value={model}>{model}</option>;
                })
            }
        </select>
      </div>
      <div>
        <label htmlFor="year-input">Year</label>
        <input type="number" id="year-input" name="year"
          value={this.state.year} onChange={this.onChange} />
      </div>
      <div>
        <label htmlFor="color-input">Color</label>
        <select id="color-input" name="color" onChange={this.onChange}>
            {
                this.state.colors.map(color => {
                    return <option value={color}>{color}</option>;
                })
            }
        </select>
      </div>
      <div>
        <label htmlFor="price-input">Price</label>
        <input type="number" id="price-input" name="price"
          value={this.state.price} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.onClick}>Save Car</button>
    </form>;
  }
}