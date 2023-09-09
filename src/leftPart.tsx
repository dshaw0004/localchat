export default function LeftPart(props: { roomid: string }) {
	return (
		<section aria-label="information about user" className="additional-info">
			<div className="userInfo">
				<h1 className="username">localchat</h1>
				<p>this part will be edited later</p>
			</div>

			<span className="roomid">
				<strong>
					your room id :-
					{" " + props.roomid}
				</strong>
			</span>
		</section>
	);
}
