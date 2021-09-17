import React from 'react';
import '../sortingAlgos/sortingAlgos'
import { bubbleSort } from '../sortingAlgos/sortingAlgos';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.randomArray(this.generateArray());
    }

    generateArray() {
        let array = [];
        for (let i = 0; i < 50; i++) {
            array.push(50 + 10 * i);
        }
        return array;
    }

    randomArray() {
        let array = this.generateArray();
        array.sort(() => 0.5 - Math.random());
        this.setState({ array });
    }

    nearlySortedArray() {
        let array = this.generateArray();
        array.sort(() => 0.9 - Math.random());
        this.setState({ array });
    }

    fewUniqueArray() {
        let array = [];
        for (let i = 0; i < 50; i++) {
            array.push(50 + 100 * Math.ceil((i+1)/10));
        }
        array.sort(() => 0.5 - Math.random());
        this.setState({ array });
    }

    reverseArray() {
        let array = this.generateArray();
        array.sort((a, b) => b - a);
        this.setState({ array });
    }

    sortArray() {
        var array = this.state.array;
        array.sort((a, b) => a - b);
        this.setState({ array });
        console.log(this.state.array);
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: '#444444',
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
                <h3>Generate New Array</h3>
                <div className="generate-buttons">
                    <button onClick={() => this.randomArray()}>Random</button> 
                    <button onClick={() => this.nearlySortedArray()}>Nearly Sorted</button> 
                    <button onClick={() => this.fewUniqueArray()}>Few Unique</button> 
                    <button onClick={() => this.reverseArray()}>Reverse</button> 
                    <button onClick={() => bubbleSort(this.array)}>Bubble Sort</button> 
                    <button onClick={() => this.sortArray()}>Sort</button>
                </div>
                <br />
            </div>
        );
    }
}