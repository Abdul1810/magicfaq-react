import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
const Magicdesk = ({ uid, position = "bottom-right", tab = "home", openOnLoad = false }) => {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const iframeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
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
    const toggleWidget = () => {
        setIsWidgetOpen((prev) => !prev);
    };
    useEffect(() => {
        var _a;
        if (iframeRef.current) {
            (_a = iframeRef.current.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage({ action: isWidgetOpen ? "open" : "close" }, "*");
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                window.parent.postMessage({ action: "close" }, "*");
                setIsWidgetOpen(false);
            }
        };
        if (isWidgetOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isWidgetOpen]);
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.action === "close") {
                setIsWidgetOpen(false);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("iframe", { src: `https://widget.magicdesk.pro/?mid=${uid}&tab=${tab}&${openOnLoad ? "open" : ""}`, title: "Magicdesk Bubble", width: "100%", height: "100%", allow: "encrypted-media", allowFullScreen: true, style: {
                    border: "none",
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    zIndex: 1000,
                    display: isWidgetOpen ? "block" : "none",
                }, ref: iframeRef }), _jsx("div", { onClick: toggleWidget, style: Object.assign(Object.assign(Object.assign({ position: "fixed" }, (position.includes("top")
                    ? { top: "24px" }
                    : { bottom: "24px" })), (position.includes("left")
                    ? { left: "24px" }
                    : { right: "24px" })), { width: "64px", height: "64px", color: "white", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#007bff", borderRadius: "50%", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", cursor: "pointer", transition: "all 0.3s ease", zIndex: isMobile ? 99 : 9999, opacity: isMounted ? 1 : 0, transform: isWidgetOpen ? "scale(0.8)" : "scale(1)" }), onMouseEnter: (e) => {
                    e.currentTarget.style.transform =
                        "scale(1.05)";
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.transform =
                        isWidgetOpen ? "scale(0.9)" : "scale(1)";
                }, children: _jsx("div", { style: {
                        transition: "all 0.3s ease",
                        transform: isWidgetOpen ? "scale(0.9)" : "scale(1)",
                    }, children: isWidgetOpen ? (_jsx("svg", { fill: "#fff", width: "24px", height: "24px", viewBox: "-1 0 19 19", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M8.5 15.313a1.026 1.026 0 0 1-.728-.302l-6.8-6.8a1.03 1.03 0 0 1 1.455-1.456L8.5 12.828l6.073-6.073a1.03 1.03 0 0 1 1.455 1.456l-6.8 6.8a1.026 1.026 0 0 1-.728.302z" }) })) : (_jsxs("svg", { fill: "#fff", width: "24px", height: "24px", viewBox: "0 0 512 512", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { children: "Chat" }), _jsx("path", { d: "M96 368Q83 368 74 359 64 349 64 336L64 128Q64 114 74 105 83 96 96 96L416 96Q430 96 439 105 448 114 448 128L448 336Q448 349 439 359 430 368 416 368L256 368 160 464 160 368 96 368Z" })] })) }) })] }));
};
export default Magicdesk;
