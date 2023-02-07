package com.project.arc205.common.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode(of = {"y", "x"})
public class Location implements Serializable {

    @Column(nullable = false)
    private Double y;
    @Column(nullable = false)
    private Double x;
}
