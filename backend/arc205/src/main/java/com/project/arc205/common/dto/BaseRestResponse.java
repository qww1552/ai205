package com.project.arc205.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
public class BaseRestResponse<T> {

    protected final T data;

}
