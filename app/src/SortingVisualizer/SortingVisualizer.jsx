import React from 'react';
import * as algo from '../sortingAlgos/sortingAlgos'
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 10;
const NUMBER_OF_ARRAY_BARS = 50;
const PRIMARY_COLOR = '#444444';
const SECONDARY_COLOR = 'red';

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
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
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
        array.reverse();
        this.setState({ array });
    }

    sortedArray() {
        var array = this.state.array;
        array.sort((a, b) => a - b);
        this.setState({ array });
        console.log(this.state.array);
    }

    animate(algo) {
        const animations = algo(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
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
                                backgroundColor: PRIMARY_COLOR,
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
                    <button onClick={() => this.sortedArray()}>Sorted</button>
                    <br/>
                    <button onClick={() => this.animate(algo.mergeSort)}>Merge Sort</button>
                    <button onClick={() => this.animate(algo.bubbleSort)}>Bubble Sort</button>
                    <button onClick={() => this.animate(algo.quickSort)}>Quick Sort</button>
                </div>
                <br />
            </div>
        );
    }
}