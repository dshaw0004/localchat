import io, { Socket } from "socket.io-client";

export default function useSocket(roomCode: string) {
	const newSocket: Socket = io("https://wschatup.dsx4.repl.co", {
		query: {
			roomid: roomCode,
		},
	});
	return newSocket;
}
