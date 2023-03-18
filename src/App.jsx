import { useState, useEffect } from 'react';
import './App.css';
import chrome from 'chrome';
function App() {
	const [seconds, setSeconds] = useState(1500); // 25 minutes in seconds
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let intervalId;

		// Save seconds to chrome storage on component unmount
		window.addEventListener('beforeunload', () => {
			chrome.storage.local.set({ seconds });
		});

		// Load saved seconds from chrome storage on component mount
		chrome.storage.local.get(['seconds'], ({ seconds: savedSeconds }) => {
			if (savedSeconds) {
				setSeconds(savedSeconds);
			}
		});

		// Start interval to countdown seconds

		if (isActive && seconds > 0) {
			intervalId = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [isActive, seconds]);

	useEffect(() => {
		if (seconds === 0) {
			const options = {
				title: 'Pomodoro Timer',
				message: 'Time is up!',
				iconUrl: 'icon.png',
			};
			chrome.notifications.create(options);
		}
	}, [seconds]);

	const handleStart = () => {
		setIsActive(true);
	};

	const handlePause = () => {
		setIsActive(false);
	};

	const handleReset = () => {
		setSeconds(1500);
		setIsActive(false);
	};

	const minutes = Math.floor(seconds / 60);
	const formattedSeconds = `${(seconds % 60).toString().padStart(2, '0')}`;

	return (
		<div className="pomodoro">
			<h2>Pomodoro Timer</h2>
			<div className="time">{`${minutes}:${formattedSeconds}`}</div>
			<div className="buttons">
				{!isActive ? (
					<button onClick={handleStart}>Start</button>
				) : (
					<button onClick={handlePause}>Pause</button>
				)}
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
}

export default App;
