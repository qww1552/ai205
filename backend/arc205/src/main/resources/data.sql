INSERT INTO arc.gamemap (id, title, start_location_x, start_location_y)
VALUES
  (1, "basic map", 0.0, 0.0)
;

INSERT INTO arc.mission (id, title)
VALUES
	(1, "공터 정화조 청소"),
	(2, "창고 비품 보충"),
	(3, "연구실 시약 온도 조절"),
	(4, "식당 음식 간보기"),
	(5, "의무실에서 약품 꺼내기"),
	(6, "라운지 벨튀범 쫓기"),
	(7, "휴게실에서 메세지 응답"),
	(8, "연구실에서 뇌파 분석"),
	(9, "라운지에서 망보기"),
	(10, "연결통로 배전반 복구")
;

INSERT INTO arc.gamemap_mission (gamemap_id, mission_id, x, y)
VALUES
	(1, 1, 17.5, -1.5),
	(1, 2, 14, 16.5),
	(1, 3, -18.5, -3.5),
	(1, 4, -17, -9.5),
	(1, 5, -19, 17.5),
	(1, 6, 4.5, -12.5),
	(1, 7, 16.5, -13.5),
	(1, 8, -13.5, 6),
	(1, 9, 1, -20)
;