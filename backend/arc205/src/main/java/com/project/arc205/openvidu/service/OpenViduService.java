package com.project.arc205.openvidu.service;


import io.openvidu.java.client.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Map;

@Getter
@Component
public class OpenViduService {

    @Autowired
    private OpenVidu openvidu;


    public Session initializeSession(Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return session;
    }

    public Connection createConnection(String roomId,Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(roomId);
        if (session == null) {
            throw new RuntimeException(); // Not Found
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection;
    }

    public void deleteConnection(String sessionId, String connectionId){
        Session session = openvidu.getActiveSession(sessionId);
        if(session==null){
            throw new RuntimeException();
        }

        try {
            session.forceDisconnect(connectionId);
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteSession(String sessionId){
        Session session = openvidu.getActiveSession(sessionId);
        if(session==null){
            throw new RuntimeException();
        }
    }





}
