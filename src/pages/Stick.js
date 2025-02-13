import { useEffect } from 'react';

export default function Stick() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/script.js';
        script.async = true;
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/styles.css';
        document.head.appendChild(link);

        return () => {
            document.body.removeChild(script);
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div>
            <div className="container">
                <div id="score"></div>
                <canvas id="game" width="375" height="375"></canvas>
                <div id="introduction">Hold down the mouse to stretch out a stick</div>
                <div id="perfect">DOUBLE SCORE</div>
                <div id="game-over-message">Whoops! You just died in this round. Complete a task to earn more lives and keep playing!
                    <button id="complete-task" onClick={() => window.location.href = '/Edu'}>Complete Task</button>
                </div>
            </div>
        </div>
    );
}
