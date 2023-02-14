const missionsLocation = [
    { id : 1, col : -21.5, row : 18.5}, // 의무실
    { id : 2, col : -18.5, row : -0.5}, // 연구실
    { id : 3, col : 17.5, row : -1.5}, // 공터
    { id : 4, col : 16.5, row : 17.5}, // 창고
    { id : 5, col : -19.5, row : -8.5}, // 식당
    { id : 6, col : 4.5, row : -12.5}, // 라운지
    { id : 7, col : 16.5, row : -13.5}, // 휴게실
]

// 공통 미션 좌표 16.5 17.5 (맨 오른쪽 위) // 창고

const walls = [
    { row : 19, col : -15, width : 8, height : 1 },
    { row : 16, col : -24.5, width : 2, height : 5 },
    { row : 9, col : -14, width : 9, height : 2.9 },
    { row : 12, col : -5, width : 3.1, height : 1 },
    { row : 8.5, col : -2.1, width : 1, height : 4.5 },
    { row : 5.5, col : -4.1, width : 3, height : 1.5 },
    { row : 2.5, col : -8.5, width : 2.5, height : 1.5 },
    { row : 6, col : -10, width : 1, height : 3 },
    { row : 0, col : -23.5, width : 0.5, height : 18 },
    { row : -6.4, col : -16.5, width : 8, height : 2.3 },
    { row : -1.7, col : -16.3, width : 0.3, height : 2.5 },
    { row : -0, col : -18, width : 1.8, height : 0.8 },
    { row : -2.5, col : -10.3, width : 4.7, height : 1.5 },
    { row : -7, col : -7.3, width : 1.5, height : 6 },
    { row : -10.5, col : -5.5, width : 1.5, height : 5.5 },
    { row : -10, col : -2.6, width : 1.5, height : 2.8 },
    { row : -11.1, col : -18, width : 0.3, height : 2.8 },
    { row : -12.5, col : -15, width : 3, height : 1.5 },
    { row : -19.5, col : -14, width : 10, height : 1.5 },
    { row : -23.5, col : 1, width : 5, height : 2.5 },
    { row : -20, col : 7.6, width : 1.7, height : 3 },
    { row : -20, col : 15, width : 6, height : 1 },
    { row : -15, col : 20, width : 1, height : 6 },
    { row : -12.5, col : 18, width : 3, height : 1.5 },
    { row : -13, col : 9, width : 4, height : 2 },
    { row : -10, col : 20, width : 3, height : 1.5 },
    { row : -10, col : 6, width : 3, height : 3 },
    { row : -10, col : 9, width : 3, height : 1.5 },
    { row : -6.5, col : 8, width : 1.5, height : 1.5 },
    { row : -5, col : 9.2, width : 0.7, height : 4 },
    { row : 5.1, col : 9.2, width : 0.7, height : 4 },
    { row : 8.5, col : 6, width : 4, height : 4.5 },
    { row : 7, col : 13, width : 6, height : 3 },
    { row : 7, col : 24, width : 1, height : 3 },
    { row : 9, col : 23, width : 1, height : 1 },
    { row : 5, col : 24.5, width : 1, height : 15 },
    { row : -0.5, col : 17, width : 1, height : 1.5 },
    { row : 17, col : 0.7, width : 9.3, height : 2 },
    { row : 19, col : 15, width : 9.3, height : 2 },
]



export { missionsLocation, walls };