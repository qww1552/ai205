package com.project.arc205.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.common.operation.operation.Operation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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

    public static BodyBuilder game(GameOperation operation) {
        return new Builder(Type.GAME, operation);
    }

    public static BodyBuilder meeting(MeetingOperation operation) {
        return new Builder(Type.MEETING, operation);
    }

    public static BodyBuilder character(CharacterOperation operation) {
        return new Builder(Type.CHARACTER, operation);
    }

    public interface BodyBuilder {

        <T> BaseResponse<T> data(T data);

        <T> BaseResponse<T> build();
    }

    private static class Builder implements BodyBuilder {

        private final Type type;
        private final Operation operation;

        private Builder(Type type, Operation operation) {
            this.type = type;
            this.operation = operation;
        }

        @Override
        public <T> BaseResponse<T> data(T data) {
            return new BaseResponse<>(this.type, this.operation, data);
        }

        @Override
        public <T> BaseResponse<T> build() {
            return new BaseResponse<>(this.type, this.operation);
        }

    }
}
