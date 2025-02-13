import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Tetris.module.css';
import Link from 'next/link';

function Tetris_game() {
    const canvasRef = useRef(null);
    const scoreRef = useRef(null);
    const notificationRef = useRef(null);

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.scale(20, 20);

        const colors = [
            null,
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF',
        ];

        const arena = createMatrix(12, 20);

        const player = {
            pos: { x: 0, y: 0 },
            matrix: null,
            score: 0,
        };

        function createMatrix(w, h) {
            const matrix = [];
            while (h--) {
                matrix.push(new Array(w).fill(0));
            }
            return matrix;
        }

        function createPiece(type) {
            if (type === 'I') {
                return [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                ];
            } else if (type === 'L') {
                return [
                    [0, 2, 0],
                    [0, 2, 0],
                    [0, 2, 2],
                ];
            } else if (type === 'J') {
                return [
                    [0, 3, 0],
                    [0, 3, 0],
                    [3, 3, 0],
                ];
            } else if (type === 'O') {
                return [
                    [4, 4],
                    [4, 4],
                ];
            } else if (type === 'Z') {
                return [
                    [5, 5, 0],
                    [0, 5, 5],
                    [0, 0, 0],
                ];
            } else if (type === 'S') {
                return [
                    [0, 6, 6],
                    [6, 6, 0],
                    [0, 0, 0],
                ];
            } else if (type === 'T') {
                return [
                    [0, 7, 0],
                    [7, 7, 7],
                    [0, 0, 0],
                ];
            }
        }

        function drawMatrix(matrix, offset) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        context.fillStyle = colors[value];
                        context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
        }

        function draw() {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);

            drawMatrix(arena, { x: 0, y: 0 });
            drawMatrix(player.matrix, player.pos);
        }

        function merge(arena, player) {
            player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        arena[y + player.pos.y][x + player.pos.x] = value;
                    }
                });
            });
        }

        function rotate(matrix, dir) {
            for (let y = 0; y < matrix.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
                }
            }

            if (dir > 0) {
                matrix.forEach((row) => row.reverse());
            } else {
                matrix.reverse();
            }
        }

        function playerDrop() {
            if (!gameOver) {
                player.pos.y++;
                if (collide(arena, player)) {
                    player.pos.y--;
                    merge(arena, player);
                    playerReset();
                    arenaSweep();
                    updateScore();
                }
            }
            dropCounter = 0;
        }

        function playerMove(offset) {
            if (!gameOver) {
                player.pos.x += offset;
                if (collide(arena, player)) {
                    player.pos.x -= offset;
                }
            }
        }

        function playerReset() {
            const pieces = 'TJLOSZI';
            player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
            player.pos.y = 0;
            player.pos.x =
                ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
            if (collide(arena, player)) {
                arena.forEach((row) => row.fill(0));
                player.score = 0;
                updateScore();
                setGameOver(true);
                showNotification();
            }
        }

        function playerRotate(dir) {
            if (!gameOver) {
                const pos = player.pos.x;
                let offset = 1;
                rotate(player.matrix, dir);
                while (collide(arena, player)) {
                    player.pos.x += offset;
                    offset = -(offset + (offset > 0 ? 1 : -1));
                    if (offset > player.matrix[0].length) {
                        rotate(player.matrix, -dir);
                        player.pos.x = pos;
                        return;
                    }
                }
            }
        }

        function collide(arena, player) {
            const m = player.matrix;
            const o = player.pos;
            for (let y = 0; y < m.length; ++y) {
                for (let x = 0; x < m[y].length; ++x) {
                    if (
                        m[y][x] !== 0 &&
                        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
                    ) {
                        return true;
                    }
                }
            }
            return false;
        }

        function arenaSweep() {
            let rowCount = 1;
            outer: for (let y = arena.length - 1; y > 0; --y) {
                for (let x = 0; x < arena[y].length; ++x) {
                    if (arena[y][x] === 0) {
                        continue outer;
                    }
                }

                const row = arena.splice(y, 1)[0].fill(0);
                arena.unshift(row);
                ++y;

                player.score += rowCount * 10;
                rowCount *= 2;
            }
        }

        function updateScore() {
            scoreRef.current.innerText = player.score;
        }

        let dropCounter = 0;
        let dropInterval = 1000;

        let lastTime = 0;
        function update(time = 0) {
            const deltaTime = time - lastTime;

            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                playerDrop();
            }

            lastTime = time;

            draw();
            if (!gameOver) {
                requestAnimationFrame(update);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        function handleKeyDown(event) {
            if (!gameOver) {
                if (event.keyCode === 37) {
                    playerMove(-1);
                } else if (event.keyCode === 39) {
                    playerMove(1);
                } else if (event.keyCode === 40) {
                    playerDrop();
                } else if (event.keyCode === 81) {
                    playerRotate(-1);
                } else if (event.keyCode === 87) {
                    playerRotate(1);
                }
            }
        }

        playerReset();
        updateScore();
        update();

        // Cleanup on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function showNotification() {
        if (notificationRef.current) {
            notificationRef.current.style.display = 'block';
        }
    }

    function handleHomeClick() {
        // Navigate to home page or handle as needed
        window.location.href = '/home';
    }

    return (
        <div className={styles.container}>
            <div ref={scoreRef} id="score"></div>
            <canvas ref={canvasRef} id="tetris" width="240" height="400" />
            {gameOver && (
                <div className={styles.notification} ref={notificationRef}>
                    <p>Oops! You did not complete the task to play.</p>
                    <button onClick={handleHomeClick}>Go to Home</button>
                </div>
            )}
        </div>
    );
}

export default Tetris_game;