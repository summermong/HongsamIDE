package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginMemberResponse {

    private String email;
    private String name;

    public LoginMemberResponse() {
    }

    public LoginMemberResponse(String email, String name) {
        this.email = email;
        this.name = name;
    }
}
