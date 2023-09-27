package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class LoginMemberResponse {

    private String email;
    private String username;

    public LoginMemberResponse() {
    }

    public LoginMemberResponse(String email, String name) {
        this.email = email;
        this.username = name;
    }
}
