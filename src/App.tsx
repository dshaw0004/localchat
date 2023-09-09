import { useEffect, useState } from "react";
import ChatArea from "./chatarea";
import "./css/main.css";
import LeftPart from "./leftPart";

////////////////////////////////////////////////////////////////////////////////

export default function App() {
	const [roomId, setRoom] = useState<string>("");
	useEffect(() => {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				const int = Math.trunc;
				const values = {
					degLat: int(latitude),
					degLong: int(longitude),
					minLat: int((latitude - int(latitude)) * 60),
					minLong: int((longitude - int(longitude)) * 60),
				};
				const roomID = `${values.degLat}d${values.minLat}m&&${values.degLong}d${values.minLong}m`;
				setRoom(roomID);
			},
			() => {
				const roomCode: string = "420d420m&&420d420m";
				setRoom(roomCode);
			}
		);
	}, []);
	return (
		<main className={`chatPage`}>
			<LeftPart roomid={roomId} />
			<section className={`chatsSection`}>
				<ChatArea roomId={roomId} />
			</section>
		</main>
	);
}
