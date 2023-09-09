import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

function connectToSocket(roomCode: string) {
	const newSocket = io("https://wschatup.dsx4.repl.co", {
		query: {
			roomid: roomCode,
		},
	});
	return newSocket;
}

export function useSocket() {
	const [socket, setSocket] = useState<Socket>(io(""));

	useEffect(() => {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				// console.log(position);
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				const int = Math.trunc;
				const values = {
					degLat: int(latitude),
					degLong: int(longitude),
					minLat: int((latitude - int(latitude)) * 60),
					minLong: int((longitude - int(longitude)) * 60),
				};
				const roomCode: string = `${values.degLat}d${values.minLat}m&&${values.degLong}d${values.minLong}m`;
				setSocket(connectToSocket(roomCode));
			},
			() => {
				const roomCode: string = "420d420m&&420d420m";
				setSocket(connectToSocket(roomCode));
			}
		);

		return () => {
			socket.close();
		};
	}, []);
	return socket;
}
