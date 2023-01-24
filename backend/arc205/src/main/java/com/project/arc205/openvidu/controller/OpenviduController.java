package com.project.arc205.openvidu.controller;

import com.project.arc205.openvidu.service.OpenViduService;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@CrossOrigin(origins = "*")
@org.springframework.web.bind.annotation.RestController
public class OpenviduController {

	@Autowired
	private OpenViduService openViduService;
	@PostMapping("/api/sessions")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openViduService.initializeSession(params);
		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}


	@PostMapping("/api/sessions/{roomId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("roomId") String roomId,
			@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {

		Connection connection = openViduService.createConnection(roomId,params);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

}
