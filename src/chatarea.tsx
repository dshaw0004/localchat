import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useRef, useState } from "react";

import { Socket } from "socket.io-client";
import "./css/main.css";

export default function ChatArea(props: {
	roomId: string;
	socket: Socket;
	toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const input = useRef<HTMLInputElement>();
	const output = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const socket = props.socket;

	const [lastMessage, setLastMessage] = useState({
		msge: "",
		ids: "",
		time: new Date().getTime(),
	});

	function displayMessage(message: string, className: string) {
		if (message == undefined) return;
		const node = document.createElement("p");
		// console.log(message);
		const arrayOfMessages = message.split("\n");
		if (arrayOfMessages.length === 1) {
			const textnode = document.createTextNode(message);
			node.appendChild(textnode);
		} else {
			arrayOfMessages.map((messageLine) => {
				node.appendChild(document.createTextNode(messageLine));
				node.appendChild(document.createElement("br"));
			});
		}

		node.classList.add(className, "messages");
		output.current?.appendChild(node);
	}

	function sendMessages(e: { preventDefault: () => void }) {
		e.preventDefault();
		if (!input.current) return;
		const msg = input.current.value;
		socket.emit("text", msg, props.roomId);
		input.current.value = "";
		displayMessage(msg, "sentMessage");
	}

	socket.on("new", (msg) => {
		displayMessage(msg, "new");
	});
	socket.on("remove", (msg) => {
		displayMessage(msg, "remove");
	});

	socket.on("meessageBroadcast", (msg, id) => {
		if (
			lastMessage.msge != msg &&
			lastMessage.ids != id &&
			new Date().getTime() >= lastMessage.time + 5500
		) {
			console.log(lastMessage);
			setLastMessage({
				msge: msg,
				ids: id,
				time: new Date().getTime(),
			});
			displayMessage(msg, "receivedMessage");
		}
	});

	return (
		<section className={`chatsSection`}>
			<div className="navbar">
				<i
					onClick={() => {
						props.toggleSideBar((prev: boolean) => {
							return !prev;
						});
					}}
					role="button"
				>
					&equiv;
				</i>
				<h3 className="messages-display">Messages</h3>
			</div>
			<div className="messagesOutput" ref={output}></div>

			<form
				action="none"
				onSubmit={sendMessages}
				className="inputMessageForChat"
				ref={formRef}
			>
				<Input
					inputRef={input}
					multiline={true}
					placeholder="Enter message"
					className="MessageInput"
					onKeyDown={(event) => {
						const is_mobile =
							!!navigator.userAgent.match(/iphone|android|blackberry/gi) ||
							false;
						if (event.key === "Enter" && !is_mobile) {
							event.preventDefault();
							// if (event.ctrlKey) {
							// 	input.current?.value += "\n";
							// }
							formRef.current?.requestSubmit();
						}
					}}
				/>
				<IconButton type="submit">
					<SendOutlinedIcon />
				</IconButton>
			</form>
		</section>
	);
}
