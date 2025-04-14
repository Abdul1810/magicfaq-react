import React from "react";
interface Props {
    uid: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    tab?: "home" | "news" | "faq" | "support";
    openOnLoad?: boolean;
}
declare const Magicdesk: React.FC<Props>;
export default Magicdesk;
