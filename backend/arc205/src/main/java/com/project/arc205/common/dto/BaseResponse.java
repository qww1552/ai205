package com.project.arc205.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.action.Operation;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse<T> {
    protected final Type type;
    protected final Operation operation;
    protected final T data;

    private BaseResponse(Type type, Operation operation) {
        this.type = type;
        this.operation = operation;
        this.data = null;
    }

    static public BaseResponse<?> of(Type type, Operation operation) {
        return new BaseResponse<>(type, operation);
    }
}
