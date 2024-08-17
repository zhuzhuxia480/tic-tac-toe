import {useState} from "react";

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];


    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        console.log(xIsNext);
        setXIsNext(!xIsNext);
    }
    return (
        <div className={"game"}>
            <div className={"game-board"}>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className={"game-info"}>
                <ol>{}</ol>
            </div>
        </div>
    )
};

export function Board({xIsNext, squares, onPlay}) {
    function handClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        console.log(squares);
        let nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    let winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handClick(8)}/>
            </div>
        </>
    );
}

function Square({value, onSquareClick}) {

    return <button className="square"
                   onClick={onSquareClick}>
        {value}
    </button>;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}