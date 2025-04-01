import React, { useState, useEffect, useRef } from "react";

interface Props {
	uid: string;
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const MagicFAQ: React.FC<Props> = ({ uid, position = "bottom-right" }) => {
	const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMounted(true);
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();

		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const toggleWidget = (): void => {
		setIsWidgetOpen((prev) => !prev);
	};

	useEffect(() => {
		if (iframeRef.current) {
			iframeRef.current.contentWindow?.postMessage(
				{ action: isWidgetOpen ? "open" : "close" },
				"*"
			);
		}
	}, [isWidgetOpen]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent<{ action: string }>) => {
			if (event.data.action === "close") {
				setIsWidgetOpen(false);
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	return (
		<>
			<iframe
				src={`https://magicfaq.vercel.app/?mid=${uid}`}
				title="Magic FAQ Widget"
				width="100%"
				height="100%"
				allow="encrypted-media"
				allowFullScreen
				style={{
					border: "none",
					position: "fixed",
					bottom: "0px",
					right: "0px",
					zIndex: 1000,
					display: isWidgetOpen ? "block" : "none",
				}}
				ref={iframeRef}
			/>

			<div
				onClick={toggleWidget}
				style={{
					position: "fixed",
					...(position.includes("top")
						? { top: "24px" }
						: { bottom: "24px" }),
					...(position.includes("left")
						? { left: "24px" }
						: { right: "24px" }),
					width: "64px",
					height: "64px",
					color: "white",
					fontSize: "2rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#007bff",
					borderRadius: "50%",
					boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
					cursor: "pointer",
					transition: "all 0.3s ease",
					zIndex: isMobile ? 99 : 9999,
					opacity: isMounted ? 1 : 0,
					transform: isWidgetOpen ? "scale(0.8)" : "scale(1)",
				}}
				onMouseEnter={(e) => {
					(e.currentTarget as HTMLDivElement).style.transform =
						"scale(1.05)";
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLDivElement).style.transform =
						isWidgetOpen ? "scale(0.9)" : "scale(1)";
				}}
			>
				<div
					style={{
						transition: "all 0.3s ease",
						transform: isWidgetOpen ? "scale(0.9)" : "scale(1)",
					}}
				>
					{isWidgetOpen ? (
						<svg
							fill="#fff"
							width="24px"
							height="24px"
							viewBox="-1 0 19 19"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M8.5 15.313a1.026 1.026 0 0 1-.728-.302l-6.8-6.8a1.03 1.03 0 0 1 1.455-1.456L8.5 12.828l6.073-6.073a1.03 1.03 0 0 1 1.455 1.456l-6.8 6.8a1.026 1.026 0 0 1-.728.302z" />
						</svg>
					) : (
						<svg
							fill="#fff"
							width="24px"
							height="24px"
							viewBox="0 0 512 512"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Chat</title>
							<path d="M96 368Q83 368 74 359 64 349 64 336L64 128Q64 114 74 105 83 96 96 96L416 96Q430 96 439 105 448 114 448 128L448 336Q448 349 439 359 430 368 416 368L256 368 160 464 160 368 96 368Z" />
						</svg>
					)}
				</div>
			</div>
		</>
	);
};

export default MagicFAQ;

// Usage example:
// <MagicFAQ uid="your-unique-id" position="top-right" />
