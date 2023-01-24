package com.project.arc205.gamecharacter.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public
class Player implements Serializable {
    private String name;
}
