package com.softsystem.Backend.DTO;


import com.softsystem.Backend.Model.Type;

public class MemberDTO {
    private String name;

    private Type type;

    public MemberDTO(String name, Type type) {
        this.name = name;
        this.type = type;
    }

    public MemberDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
