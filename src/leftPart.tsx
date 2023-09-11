export default function LeftPart(props: {
	roomid: string;
	sideBarState: boolean;
	toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<section
			aria-label="extra some info"
			className={`additional-info ${props.sideBarState ? "show" : "hide"}`}
		>
			<div className="navbar">
				<h1 className="">localchat</h1>
				<i
					onClick={() => {
						props.toggleSideBar((prev: boolean) => {
							return !prev;
						});
					}}
				>
					&times;
				</i>
			</div>
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
