INSERT INTO arc.gamemap (title, start_location_x, start_location_y)
VALUES
  ("basic map", 0.0, 0.0)
;

INSERT INTO arc.mission (id, title)
VALUES
	(1, "m1"),
	(2, "m2"),
	(3, "m3"),
	(4, "m4"),
	(5, "m5")
;

INSERT INTO arc.gamemap_mission (gamemap_id, mission_id, x, y)
VALUES
	(1, 1, 3.0, 3.0),
	(1, 2, 6.0, 6.0),
	(1, 3, -3.0, -3.0),
	(1, 4, -6.0, -6.0),
	(1, 5, -3.0, 3.0)
;