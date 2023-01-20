package com.project.arc205.openvidu.service;


import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Getter
@Component
public class OpenViduService {

    @Autowired
    private OpenVidu openvidu;

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
