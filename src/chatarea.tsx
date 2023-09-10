// import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useRef } from "react";

// import { useSocket } from "./socket";
import "./css/main.css";
import { Socket } from "socket.io-client";

export default function ChatArea(props: { roomId: string; socket: Socket }) {
	const input = useRef<HTMLInputElement>();
	const output = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const socket = props.socket;

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
		// const past_msg = output.current?.textContent;
		// output.current.textContent = past_msg + "\n" + message;
	}

	function sendMessages(e: { preventDefault: () => void }) {
		e.preventDefault();
		if (!input.current) return;
		const msg = input.current.value;
		socket.emit("text", msg, props.roomId);
		input.current.value = "";
		displayMessage(msg, "sentMessage");
	}

	// const [receivedMessage, setReceivedMessage] = useState();

	// useEffect(() => {
	// 	displayMessage(receivedMessage, "receivedMessage");
	// }, [receivedMessage]);

	socket.on("meessageBroadcast", (msg) => {
		// console.log(msg);
		displayMessage(msg, "receivedMessage");
	});

	return (
		<>
			<h3 className="messages-display">Messages</h3>
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
					send
					{/* <SendOutlinedIcon /> */}
				</IconButton>
			</form>
		</>
	);
}
