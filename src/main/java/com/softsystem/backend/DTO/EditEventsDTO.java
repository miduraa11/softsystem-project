package com.softsystem.backend.dto;

import com.softsystem.backend.model.Member;
import com.softsystem.backend.model.Type;
import java.util.List;

public class EditEventsDTO {

    private List<Member> members;
    private List<Type> types;

    public EditEventsDTO(List<Member> members, List<Type> types) {
        this.members = members;
        this.types = types;
    }

    public EditEventsDTO() {
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public List<Type> getTypes() {
        return types;
    }

    public void setTypes(List<Type> types) {
        this.types = types;
    }
}
