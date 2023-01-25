package com.project.arc205.common.dto;

import com.project.arc205.operation.Action;
import com.project.arc205.operation.SubAction;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BaseResponse {
    protected Action action;
    protected SubAction subAction;
}
