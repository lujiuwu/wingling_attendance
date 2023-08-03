import { Notification } from "element-ui";

const showNotice = (type, title, message, duration = 2000, iconClass, position, showClose) => {
    Notification({
        type: type,
        title: title,
        message: message,
        duration: duration,
        iconClass: iconClass,
        position: position,
        showClose: showClose
    });
};

export default showNotice;