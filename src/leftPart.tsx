export default function LeftPart(props: {
	roomid: string;
	sideBarState: boolean;
}) {
	return (
		<section
			aria-label="extra some info"
			className={`additional-info ${props.sideBarState ? "show" : ""}`}
		>
			<h1 className="">localchat</h1>
			<p>this part will be edited later</p>

			<p className="roomid">
				<strong>
					your room id :- <wbr />
					{props.roomid}
				</strong>
			</p>
		</section>
	);
}
