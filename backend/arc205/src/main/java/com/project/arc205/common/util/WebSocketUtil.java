package com.project.arc205.common.util;

import java.util.Objects;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;

public class WebSocketUtil {

    private final static String SUBSCRIPTION_PREFIX = "/sub";

    public static MessageHeaders createHeaders(String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor
                .create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }

    public static boolean isRoomSubscriptionMessage(SimpMessageHeaderAccessor accessor) {
        return isSubscriptionCommand(accessor) &&
                isSubscriptionDestination(accessor);
    }

    private static boolean isSubscriptionDestination(SimpMessageHeaderAccessor accessor) {
        return Objects.requireNonNull(accessor.getDestination()).startsWith(SUBSCRIPTION_PREFIX);
    }

    private static boolean isSubscriptionCommand(SimpMessageHeaderAccessor accessor) {
        return SimpMessageType.SUBSCRIBE.equals(accessor.getMessageType());
    }

}
